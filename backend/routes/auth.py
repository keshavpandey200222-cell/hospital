from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models import db, User

auth_bp = Blueprint('auth', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        
        if not token:
            return jsonify({'success': False, 'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'success': False, 'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify(success=False, message="Please provide name, email, and password"), 400

    if User.query.filter_by(email=email).first():
        return jsonify(success=False, message="User already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    token = jwt.encode({
        'user_id': new_user.id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")

    response = jsonify(success=True, user=new_user.to_dict())
    # Setting httpOnly cookie
    response.set_cookie('token', token, httponly=True, secure=False, samesite='Lax')
    return response

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify(success=False, message="Please provide email and password"), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify(success=False, message="Invalid credentials"), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")

    response = jsonify(success=True, user=user.to_dict())
    response.set_cookie('token', token, httponly=True, secure=False, samesite='Lax')
    return response

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_me(current_user):
    return jsonify(success=True, user=current_user.to_dict())

@auth_bp.route('/logout', methods=['GET'])
def logout():
    response = jsonify(success=True, message="Logged out successfully")
    response.set_cookie('token', '', expires=0)
    return response
