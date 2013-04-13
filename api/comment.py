import datetime
from mongoengine import *
from bottle import *
from api.user import *


class Comment(Document):
    author = ReferenceField("User")
    content = StringField(required=True)
    date = DateTimeField(required=True, default=datetime.datetime.now)


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


@get('/comments/:event_id')
def viem_comments(event_id):
    return (Event.objects(event_id=event_id)[0]).comments