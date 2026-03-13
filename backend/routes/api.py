from flask import Blueprint, request, jsonify
from models import db, Appointment, Report, TestBooking, Subscription, User
from routes.auth import token_required

api_bp = Blueprint('api', __name__)

@api_bp.route('/appointments/my-appointments', methods=['GET'])
@token_required
def get_my_appointments(current_user):
    appointments = Appointment.query.filter_by(user_id=current_user.id).all()
    return jsonify(success=True, data=[apt.to_dict() for apt in appointments])

@api_bp.route('/appointments', methods=['POST'])
@token_required
def book_appointment(current_user):
    data = request.get_json()
    doctor_name = data.get('doctor')
    department = data.get('department')
    date = data.get('date')
    time = data.get('time')
    
    if not doctor_name or not department or not date or not time:
        return jsonify(success=False, message="Missing required fields"), 400
        
    new_apt = Appointment(
        user_id=current_user.id,
        patient_name=current_user.name,
        doctor_name=doctor_name,
        department=department,
        date=date,
        time=time,
        status="Upcoming"
    )
    db.session.add(new_apt)
    db.session.commit()
    
    return jsonify(success=True, data=new_apt.to_dict())

@api_bp.route('/newsletter/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify(success=False, message="Email required"), 400
        
    sub = Subscription.query.filter_by(email=email).first()
    if not sub:
        new_sub = Subscription(email=email)
        db.session.add(new_sub)
        db.session.commit()
        
    return jsonify(success=True, message="Subscribed successfully")

@api_bp.route('/hospitals', methods=['GET'])
def get_hospitals():
    # Mock data for now, matching the frontend's expected properties
    hospitals = [
        {
            "id": "1",
            "name": "City Care General Hospital",
            "address": "123 Health Ave, Central District",
            "city": "New York",
            "rating": 4.8,
            "reviews": 1250,
            "specializations": ["Cardiology", "Neurology", "Pediatrics"],
            "imageUrl": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
        },
        {
            "id": "2",
            "name": "St. Mary Specialized Clinic",
            "address": "456 Wellness Blvd, North Side",
            "city": "Chicago",
            "rating": 4.6,
            "reviews": 840,
            "specializations": ["Orthopedics", "Dermatology"],
            "imageUrl": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800"
        },
        {
            "id": "3",
            "name": "Metro Heart Institute",
            "address": "789 Life St, South Plaza",
            "city": "San Francisco",
            "rating": 4.9,
            "reviews": 2100,
            "specializations": ["Cardiology", "Surgery"],
            "imageUrl": "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800"
        }
    ]
    return jsonify(success=True, data=hospitals)

@api_bp.route('/reports/my-reports', methods=['GET'])
@token_required
def get_my_reports(current_user):
    reports = Report.query.filter_by(user_id=current_user.id).all()
    return jsonify(success=True, data=[rep.to_dict() for rep in reports])

@api_bp.route('/test-bookings', methods=['POST'])
@token_required
def book_test(current_user):
    data = request.get_json()
    test_name = data.get('testName')
    price = data.get('price')
    collection_type = data.get('collectionType', 'home')
    
    if not test_name or price is None:
        return jsonify(success=False, message="Test name and price are required"), 400
        
    new_booking = TestBooking(
        user_id=current_user.id,
        test_name=test_name,
        price=price,
        collection_type=collection_type
    )
    db.session.add(new_booking)
    db.session.commit()
    
    return jsonify(success=True, data=new_booking.to_dict())

@api_bp.route('/medicines', methods=['GET'])
def get_medicines():
    # Mock data for medicines
    medicines = [
        {"id": "m1", "name": "Paracetamol", "price": 5.99, "stock": 100},
        {"id": "m2", "name": "Amoxicillin", "price": 12.50, "stock": 50}
    ]
    return jsonify(success=True, data=medicines)

@api_bp.route('/doctor/appointments', methods=['GET'])
@token_required
def get_doctor_appointments(current_user):
    if current_user.role != 'doctor':
        return jsonify(success=False, message="Unauthorized access"), 403
    
    # In a real app we'd match by doctor ID. For this demo we'll just match all, 
    # or match by name, but let's just return all appointments since it's a demo.
    appointments = Appointment.query.all()
    return jsonify(success=True, data=[apt.to_dict() for apt in appointments])

@api_bp.route('/doctor/appointments/<id>/status', methods=['PUT'])
@token_required
def update_appointment_status(current_user, id):
    if current_user.role != 'doctor':
        return jsonify(success=False, message="Unauthorized access"), 403
        
    data = request.get_json()
    status = data.get('status')
    
    if not status:
        return jsonify(success=False, message="Status is required"), 400
        
    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify(success=False, message="Appointment not found"), 404
        
    appointment.status = status
    db.session.commit()
    
    return jsonify(success=True, data=appointment.to_dict())
