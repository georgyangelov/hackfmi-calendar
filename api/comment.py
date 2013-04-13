import datetime
from mongoengine import *


class Comment(Document):
    author = ReferenceField("User")
    content = StringField(required=True)
    date = DateTimeField(required=True, default=datetime.datetime.now)

