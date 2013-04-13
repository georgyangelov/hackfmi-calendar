from mongoengine import *


#connect('calendar', host='mongodb://hackfmi-calendar-user:kalinka@ds059947.mongolab.com:59947/hackfmi-calendar')


class User(Document):
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    email = StringField(required=True)
    student_id = IntField(required=True)
    grade = IntField(required=True)
    tags = ListField(ReferenceField(Tag))

