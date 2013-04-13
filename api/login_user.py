from bottle import *
from mongoengine import *
import hashlib
import re


class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    salt = StringField(required=True)
    email = EmailField(required=True)
    student_id = IntField(required=True)
    grade = IntField(required=True)
    major_id = IntField(required=True)
    tags = ListField(ReferenceField("Tag"))

    def __repr__(self):
        return json.dumps(self.__dict__["_data"])


@error(400)
def error400(error, message):
    return message

print("Test")


@post('/user/login')
def login():
    log_email = request.forms.get('email')
    log_password = request.forms.get('password')
    if User.find(email=log_email):
        return "User is here"
    else:
        return error400("Invalid user")

    return {success: True}