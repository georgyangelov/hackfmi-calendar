import datetime
from mongoengine import *


class Tag(Document):
    name = StringField(required=True)
    administrator = ReferenceField("User")
