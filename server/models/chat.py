from datetime import datetime
from mongoengine import Document, StringField, DateTimeField

class Chat(Document):
    message = StringField(required=True)
    sender = StringField(required=True)
    orderId = StringField(required=True)
    timestamp = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'chats'
    }