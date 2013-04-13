from bottle import *
from mongoengine import *

class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    email = StringField(required=True)
    student_id = IntField(required=True)
    grade = IntField(required=True)
    major = StringField(required=True)
    tags = ListField(ReferenceField("Tag"))


@error(400)
def error400(error):
    return "You've missed some of the obligatory fields"

print("Test")


@post('/register/')
def register():
    user = User()
    user.first_name = request.forms.get('first_name')
    user.last_name = request.forms.get('last_name')
    user.email = request.forms.get('email')
    user.student_id = request.forms.get('student_id')
    user.grade = request.forms.get('grade')
    user.tags = request.forms.get('tags')
    if check_login(user.first_name, user.student_id):
        return error400()