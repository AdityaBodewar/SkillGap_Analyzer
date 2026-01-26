from flask import Blueprint,requests,jsonify,request
import os
from dotenv import load_dotenv
import jwt 
from datetime import datetime
from flask import redirect
import urllib.parse

load_dotenv()

Authbp=Blueprint("Google_Auth",__name__)

@Authbp.route("/auth/callback")
def google_callback():
    code = request.args.get("code")

    token_url = "https://oauth2.googleapis.com/token"

    data = {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:5000/auth/callback"
    }

    token_res = requests.post(token_url, data=data).json()

    access_token = token_res.get("access_token")

    user_info = requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"}
    ).json()

    email = user_info["email"]

    
    payload = {
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }

    jwt_token = jwt.encode(payload, os.getenv("SECRET"), algorithm="HS256")

    return jsonify({
        "token": jwt_token,
        "user": user_info
    })




Authbp.route("/auth/google")
def google_login():
    params = {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "redirect_uri": "http://localhost:5000/auth/callback",
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }

    url = "https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode(params)
    return redirect(url)






    
        