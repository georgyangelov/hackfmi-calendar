import datetime
from bottle import *
from mongoengine import *
from api.user import *
import bson.dbref


class Event(Document):
    name = StringField(required=True)
    description = StringField()
    date = DateTimeField(required=True, default=datetime.datetime.now)
    creator = IntField() #user_id
    tags = ListField(ReferenceField("Tag"))
    comments = ListField(ReferenceField("Comment"))
    users_approved = ListField(IntField())
    id_field = StringField()

    def to_json(self):
        return {
                "name": self.name,
                "description": self.description,
                "date": str(self.date),
                "creator": self.creator,
                "tags": self.tags,
                "comments": self.comments,
                "users_approved": self.users_approved,
                "id_field": self.id_field
                }


@post('/events/session/:session_key')
def create_events(session_key):
    event = Event()
    event.name = request.forms.getunicode('name')
    event.description = request.forms.getunicode('description')
    event.date = datetime.datetime.strptime(request.forms.getunicode('date'), '%d.%m.%Y %H:%M')
    users = User.objects()
    add_users = [user for user in users if session_key in user.session_keys]
    if add_users:
        event.creator = add_users[0].student_id
        event.users_approved.append(event.creator)
    else:
        return error403("There is no user with that session key")
    event.tags = request.forms.getunicode('tags')
    event.id_field = str(datetime.datetime.now()) + event.name + str(random.randint(1000000, 9999999))
    event.save()
    return {"success": True}


@get('/events/tags/:tag')
def get_events(tag):
    events = Event.objects()
    if events:
        return [json.dumps(event.to_json()) for event in events if tag in event.tags]
    else:
        return error403("There is not such tag")


@get('/events/:event_id')
def get_events_by_id(event_id):
    events = Event.objects()
    if events:
        return [json.dumps(event.to_json()) for event in events if event_id == event.id_field]
    else:
        return error403("There is not such event")


@get('/events/month/:month_id')
def get_events_by_month(month_id):
    month = int(month_id)
    if month < 0 or month > 11:
        return error400("Invalid month")
    events = Event.objects()
    if events:
        return [json.dumps(event.to_json()) for event in events if event.date.date().month == month + 1]
    else:
        return error403("There are no events in this month")
