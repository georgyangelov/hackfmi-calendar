from bottle import *
from mongoengine import *
import hashlib
import re
import json
import datetime


class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    email = EmailField(required=True, unique=True)
    student_id = IntField(required=True, unique=True)
    grade = IntField(required=True)
    major_id = IntField(required=True)
    tags = ListField(ReferenceField("Tag"))
    session_keys = ListField(StringField())

    def to_json(self):
        representation = self.__dict__["_data"].copy()
        del representation[None]
        del representation['password']
        return json.dumps(representation)

    def to_json(self):
        copy = (self.__dict__["_data"]).copy()
        del copy[None]
        del copy['password']
        return json.dumps(copy)


@error(400)
def error400(message):
    raise HTTPResponse('{"success": false, "message": "' + str(message) + '"}', 400)


@post('/user/register/')
def register():
    user = User()
    user.first_name = request.forms.getunicode('first_name')
    user.last_name = request.forms.getunicode('last_name')
    user.email = request.forms.getunicode('email')
    user.student_id = request.forms.getunicode('student_id')
    user.grade = request.forms.getunicode('grade')
    user.password = request.forms.getunicode('password')
    user.major_id = request.forms.getunicode('major_id')

    name_pattern = r"[A-ЯA-Z][а-яa-z]+(-[A-ЯA-Z][а-яa-z]*)?"

    if user.first_name is None or not re.match(name_pattern, user.first_name):
        error400("Invalid first name")
    if user.last_name is None or not re.match(name_pattern, user.last_name):
        error400("Invalid last name")
    if user.password is None or not re.match("[^\s]{6,}", user.password):
        error400("Invalid password")
    if user.student_id is None or not re.match("\d{5,6}", user.student_id):
        error400("Invalid faculty number")

    m = hashlib.sha256()
    m.update(user.password.encode())
    user.password = m.hexdigest()

    try:
        user.save()
    except ValidationError as error:
        return error400(error)
    except NotUniqueError as error:
        return error400('Email or faculty number not unique')

    return {"success": True}


@get('/check/:email')
def check_email(email):
    return {"check_email": bool(User.objects(email=email))}


@post('/user/login/')
def login():
    email = request.forms.getunicode('email')
    password = request.forms.getunicode('password')
    if User.objects(email=email):
        return json.dumps({
            'session_key': "mine",
            'user': User.objects(email=email)[0].to_json(),
            'success': True
            })
        return User.objects(email=email)[0].to_json()
    else:
        return error400("Invalid user")

    return {"success": True}

