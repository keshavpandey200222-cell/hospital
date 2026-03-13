import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from models import db
from routes.auth import auth_bp
from routes.api import api_bp

app = Flask(__name__)

# Basic Configuration
# Use environment variables for production secrets
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-prod')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///hms.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enable CORS for frontend
frontend_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
CORS(app, resources={r"/api/*": {"origins": [frontend_url, "http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)

# Secure cookies for production when using Vercel + Render (cross-site)
if os.environ.get('RENDER'):
    app.config.update(
        SESSION_COOKIE_SAMESITE='None',
        SESSION_COOKIE_SECURE=True,
    )

# Initialize Plugins
db.init_app(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(api_bp, url_prefix='/api')

from werkzeug.security import generate_password_hash

# Creating DB Tables
with app.app_context():
    db.create_all()
    
    from models import User
    if not User.query.filter_by(email="demo@example.com").first():
        demo_user = User(
            name="Demo User",
            email="demo@example.com",
            password_hash=generate_password_hash("password123"),
            role="patient"
        )
        db.session.add(demo_user)
        db.session.commit()
        print("Demo account created: demo@example.com / password123")
        
    if not User.query.filter_by(email="doctor@example.com").first():
        doctor_user = User(
            name="Dr. Smith",
            email="doctor@example.com",
            password_hash=generate_password_hash("password123"),
            role="doctor"
        )
        db.session.add(doctor_user)
        db.session.commit()
        print("Doctor account created: doctor@example.com / password123")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return jsonify({"message": "HMS API is running. Use /api/* endpoints."})

@app.errorhandler(404)
def not_found(e):
    return jsonify(success=False, message="Resource not found"), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
