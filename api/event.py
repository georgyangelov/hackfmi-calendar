import datetime
from mongoengine import *

class Event(Document):
    name = StringField(required=True)
    description = StringField()
    date = DateTimeField(required=True, default=datetime.datetime.now)
    creator = ReferenceField(User)
    tags = ListField(ReferenceFields(Tag))
