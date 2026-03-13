from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="patient")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "_id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow)

class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    patient_name = db.Column(db.String(100), nullable=False)
    doctor_name = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="Upcoming")
    id_visible = db.Column(db.String(20), nullable=True) # e.g. APT-8481
    
    def to_dict(self):
        return {
            "_id": self.id,
            "patientName": self.patient_name,
            "doctor": self.doctor_name,
            "department": self.department,
            "date": self.date,
            "time": self.time,
            "status": self.status,
            "idVisible": self.id_visible or f"APT-{self.id[:4].upper()}"
        }

class Report(db.Model):
    __tablename__ = 'reports'
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="Ready")
    provider = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    highlights = db.Column(db.String(200), nullable=True)
    id_visible = db.Column(db.String(20), nullable=True)
    
    def to_dict(self):
        return {
            "_id": self.id,
            "title": self.title,
            "date": self.date,
            "status": self.status,
            "provider": self.provider,
            "category": self.category,
            "highlights": self.highlights,
            "idVisible": self.id_visible or f"REP-{self.id[:4].upper()}"
        }

class TestBooking(db.Model):
    __tablename__ = 'test_bookings'
    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    test_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    collection_type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="Confirmed")
    booked_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "_id": self.id,
            "testName": self.test_name,
            "price": self.price,
            "collectionType": self.collection_type,
            "status": self.status
        }
