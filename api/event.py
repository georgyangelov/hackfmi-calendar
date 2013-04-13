import datetime
from bottle import *
from mongoengine import *

class Event(Document):
    name = StringField(required=True)
    description = StringField()
    date = DateTimeField(required=True, default=datetime.now)
    creator = ReferenceField("User")
    tags = ListField(ReferenceField("Tag"))
    comments = ListField(ReferenceField("Comment"))
    users_approved = ListField(ReferenceField("User"))
    event_id = ObjectIdField(required=True, unique=True)


@post('/events/session/:session_key')
def events(session_key):
    event = Event()
    event.name = request.forms.getunicode('name')
    event.description = request.forms.getunicode('description')
    event.date = request.forms.getunicode('date')
    user = User.find_user(session_key)
    event.creator = user
    event.tags = request.forms.getunicode('Tags')
    event.comments = request.forms.getunicode('Comment')
    event.users_approved.append(user)
    return {"success": True}


@get('/events/:tag')
def get_events(tag):
    events = Event.objects()
    return [event for event in events if tag in event.tags]


@get('/events/:event_id')
def get_events_by_id(event_id):
    events = Event.objects()
    return [event for event in events if event_id in event.event_id]
