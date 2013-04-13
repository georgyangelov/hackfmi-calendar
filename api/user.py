from bottle import *
from mongoengine import *
import hashlib
import re

class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    salt = StringField(required=True)
    email = StringField(required=True)
    student_id = IntField(required=True)
    grade = IntField(required=True)
    major_id = IntField(required=True)
    tags = ListField(ReferenceField("Tag"))


@error(400)
def error400(error, message):
    return message

print("Test")


def check_register(*args):
    if None in args:
        return error400()


@post('/register/')
def register():
    user = User()
    user.first_name = request.forms.get('first_name')
    user.last_name = request.forms.get('last_name')
    user.email = request.forms.get('email')
    user.student_id = request.forms.get('student_id')
    user.grade = request.forms.get('grade')
    user.major_id = request.forms.get('major_id')
    user.tags = request.forms.get('tags')
    m = hashlib.sha256()
    m.update(request.forms.get('password'))
    user.password = m.hexdigest()
    name_pattern = r"[A-Я][а-я]+(-[A-Я][а-я]*)?"
    if re.match(name_pattern, user.first_name):
        return error400("Invalid first name")
    if re.match(name_pattern, user.last_name):
        return error400("Invalid last name")
    if re.match("[^\s]{6,}", user.password):
        return error400("Invalid password")
    if re.match("[^_\d][A-Za-z\d_\.][^_\.]@\w{3,5}.\w{2,3}", user.email): #Need better regex
        return error400("Invalid e-mail")
    if re.match("\d{5,6}", user.student_id):
        return error400("Invalid faculty number")
    check_register(major_id, grade, tags)
    user.save()

    {status: True}