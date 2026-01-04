from flask import Flask
from flask_cors import CORS
from App.extensions import mongo_Connection,Cloud_connection
from App.Routes import Register_Routes

def Start_App():

    app=Flask(__name__)
    CORS(app)
    mongo_Connection(app)
    Cloud_connection(app)
    Register_Routes(app)
    return app
