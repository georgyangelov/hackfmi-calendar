from mongoengine import *


class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True)
    student_id = IntField(required=True)
    grade = IntField(required=True)
    tags = ListField(ReferenceField(Tag))

