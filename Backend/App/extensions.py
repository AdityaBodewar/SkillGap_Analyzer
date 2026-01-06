from pymongo import MongoClient
import os 
from dotenv import load_dotenv
import cloudinary

load_dotenv()

mongo_uri=os.getenv("MONGODB_URI")
cloudname=os.getenv("CLOUD_NAME")
cloud_apikey=os.getenv("CLOUD_API_KEY")
cloud_apisecret=os.getenv("CLOUD_API_SECRET")
mongo_client=None
db=None

def mongo_Connection(app):
    global mongo_client,db
    try:
        mongo_client=MongoClient(mongo_uri)
        db=mongo_client["PractiseDB"]
        print("Mongo Db Connected Successfully")
    except Exception as e:
        print("error :"+str(e))

def Cloud_connection(app):
    try:
        cloudinary.config(
           cloud_name= cloudname,
            api_key=cloud_apikey,
            api_secret=cloud_apisecret,
            secure=True
        )
        return print("Cloud connected Successfully")
    except Exception as e:
        return print("error : "+str(e))










