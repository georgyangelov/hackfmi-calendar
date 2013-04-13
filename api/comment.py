import datetime
from mongoengine import *
from user import User


class Comment(Document):
    author = ReferenceField(User)
    content = StringField(required=True)
    date = DateTimeField(required=True, default=datetime.datetime.now)

