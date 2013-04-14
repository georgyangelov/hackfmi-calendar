import datetime
from mongoengine import *
from bottle import *
from api.user import *
from api.event import *

class Tag(Document):
    name = StringField(required=True, unique=True)
    administrator = IntField()


@post('/tags/session/:session_key')
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


@get('/tags/:tag_id')
def events_with_tag(tag_id):
    events = Event.objects()
    tag_events = [event for event in events if tag_id in event.tags]
    if tag_events:
        return tag_events
    else:
        return error403("There are no events for this tag")
