from bottle import *
from mongoengine import *
import api

connect('calendar', host='mongodb://hackfmi-calendar-user:kalinka@ds059947.mongolab.com:59947/hackfmi-calendar')

@route('/web/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./gui')

run(host='localhost', port=8080)
