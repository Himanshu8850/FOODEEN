from datetime import datetime, timedelta
from mongoengine import Document, ReferenceField, StringField, IntField, DateTimeField

class Listing(Document):
    restaurant_id = ReferenceField('User', required=True)
    name = StringField(required=True)
    quantity = IntField(required=True)
    expiry = IntField(required=True, choices=[1, 2, 3, 480])  # Expiry in hours
    view = StringField(choices=['blocked', 'not blocked'], default='not blocked')
    food_type = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    expires_at = DateTimeField()

    def save(self, *args, **kwargs):
        # Set expires_at based on expiry hours
        if self.expiry:
            self.expires_at = datetime.utcnow() + timedelta(hours=self.expiry)
        super(Listing, self).save(*args, **kwargs)

    meta = {
        'collection': 'listings',
        'indexes': [
            {
                'fields': ['expires_at'],
                'expireAfterSeconds': 0
            }
        ]
    }
