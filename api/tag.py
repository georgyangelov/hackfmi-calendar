import datetime
from mongoengine import *
from bottle import *
from api.user import *

class Tag(Document):
    name = StringField(required=True, unique=True)
    administrator = IntField()


@post('/tags/:session_key')
def add_tags(session_key):
    tag = Tag()
    tag.name = request.forms.getunicode('name')
    users = User.objects()
    admins = [user for user in users if session_key in user.session_keys]
    if admins:
        tag.administrator = admins[0].student_id
    else:
        return error403("There is no user with that session key")
    tag.save()
    return {"success": True}
