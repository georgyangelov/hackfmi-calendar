import datetime
from bottle import *
from mongoengine import *
from api.user import *


class Event(Document):
    name = StringField(required=True)
    description = StringField()
    date = DateTimeField(required=True, default=datetime.datetime.now)
    creator = ReferenceField("User")
    tags = ListField(ReferenceField("Tag"))
    comments = ListField(ReferenceField("Comment"))
    users_approved = ListField(ReferenceField("User"))
    id_field = ObjectIdField()

    def to_json(self):
        representation = self.__dict__["_data"].copy()
        del representation[None]
        return json.dumps(representation)


@post('/events/session/:session_key')
def create_events(session_key):
    event = Event()
    event.name = request.forms.getunicode('name')
    event.description = request.forms.getunicode('description')
    event.date = request.forms.getunicode('date')
    for user in User.objects():
        if session_key in user.session_keys:
            event.creator = user
        else:
            return error403("There is no user with that session key")
    event.tags = request.forms.getunicode('Tags')
    event.comments = request.forms.getunicode('Comment')
    event.users_approved.append(user)
    event.save()
    return {"success": True}


@get('/events/tags/:tag')
def get_events(tag):
    events = Event.objects()
    if events:
        return [event.to_json() for event in events if tag in event.tags]
    else:
        return error403("There is not such tag")


@get('/events/:event_id')
def get_events_by_id(event_id):
    events = Event.objects()
    if events:
        return [event.to_json() for event in events if event_id == event.id_field]
    else:
        return error403("There is not such event")


@get('/events/month/:month_id')
def get_events_by_month(month_id):
    month = int(month_id)
    if month < 0 or month > 11:
        return error400("Invalid month")
    events = Event.objects()
    if events:
        return [event.to_json() for event in events if event.date.date().month == month + 1]
    else:
        return error403("There are no events in this month")
