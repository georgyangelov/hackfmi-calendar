import datetime
from mongoengine import *
from bottle import *
from api.user import *
from api.event import *


class Comment(Document):
    author = ReferenceField("User")
    content = StringField(required=True)
    date = DateTimeField(required=True, default=datetime.datetime.now)

    def to_json(self):
        representation = self.__dict__["_data"].copy()
        del representation[None]
        del representation['password']
        return json.dumps(representation)


@post('/comment/:session_key')
def publish_comment(session_key):
    comment = Comment()
    users = User.objects()
    user = list(filter(lambda user: session_key in user.session_keys, users))
    if find_user(session_key):
        comment.author = user[0]
    else:
        return error403("There is no user with this session key")
    comment.content = request.forms.getunicode('content')
    comment.date = datetime.datetime.now
    comment.save()
    return {"success": True}


@get('/comments/:event_id')
def view_comments(event_id):
    if Event.objects(id_field=event_id):
        return map(lambda comment: comment.to_json(), (Event.objects(id_field=event_id)[0]).comments)
    else:
        return error403("There is no such event")
