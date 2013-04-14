import datetime
from mongoengine import *
from bottle import *
from api.user import *
from api.event import *


class Comment(Document):
    author = IntField() #user_id
    content = StringField(required=True)
    date = DateTimeField(required=True, default=datetime.datetime.now)
    comment_id = StringField()

    def to_json(self):
        user = User.objects(student_id=self.author)[0]
        return {
                "author": user.first_name + ' ' + user.last_name,
                "content": self.content,
                "date": str(self.date),
                "comment_id": self.comment_id
                }

@post('/comment/:session_key/:event_id')
def publish_comment(session_key, event_id):
    comment = Comment()
    users = User.objects()
    user = list(filter(lambda user: session_key in user.session_keys, users))
    if find_user(session_key):
        comment.author = user[0].student_id
    else:
        return error403("There is no user with this session key")
    com_id = str(datetime.datetime.now()) + str(comment.author) + str(random.randint(1000000, 9999999))
    m = hashlib.sha256()
    m.update(com_id.encode())
    comment.comment_id = m.hexdigest()
    comment.content = request.forms.getunicode('content')
    comment.date = datetime.datetime.now()
    events = [event for event in Event.objects() if event.id_field == event_id]
    if events:
        events[0].comments.append(comment.comment_id)
        events[0].save()
        comment.save()
    else:
        return error403("Invalid event")
    return {"success": True}


@get('/comments/:event_id') #nameri komentar po id
def view_comments(event_id):
    events = [event for event in Event.objects() if event.id_field == event_id]
    if events:
        return '[' + ', '.join(map(lambda _id: json.dumps(Comment.objects(comment_id=_id)[0].to_json()), events[0].comments)) + ']'
    else:
        return error403("There is no such event")

