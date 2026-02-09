import jwt 
from datetime import datetime,timedelta
import os
from dotenv import load_dotenv
from flask import jsonify

load_dotenv()

secret=os.getenv("SECRET")

def Generate_Token(userId,Role):
    
    payload={"userId":userId,"Role":Role}
    token=jwt.encode(payload,secret,algorithm="HS256")
    return token

def Decode_Token(token):
        decode=jwt.decode(token,secret,algorithms="HS256")
        return decode
   
        