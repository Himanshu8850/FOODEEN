from datetime import datetime
from mongoengine import Document, StringField, EmailField, FloatField, DateTimeField, IntField

class User(Document):
    username = StringField(required=True, unique=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    user_type = StringField(choices=['Restaurant', 'Charity/NGO'], required=True)
    verification_code = StringField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)
    location_name = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)
    
    # New fields for tracking NGO orders by food type
    vegorders = IntField(default=0)
    veganorders = IntField(default=0)
    nonvegorders = IntField(default=0)

    meta = {
        'collection': 'users'
    }