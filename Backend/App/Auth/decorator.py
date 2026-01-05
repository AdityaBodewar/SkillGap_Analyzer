from functools import wraps
from flask import request,jsonify
from .jwt_utils import Decode_Token

def Admin_Only(f):
    @wraps(f)
    def required(*args,**kwargs):
        header_auth=request.headers.get("Authorization")
        if not header_auth:
            return jsonify({"error":"Login required "}),401
        token=header_auth.split(" ")[1]
        data=Decode_Token(token)
        if not data:
            return jsonify({"error":"Invalid Token"}),403
       
        if data["Role"] not in ["Admin", "admin"]:
            return jsonify({"error":"Admin Authorize Only"}),403
        return f(*args,user_id=data["userId"],**kwargs)
    return required

def IdentityOfUser(f):
    def required(*args,**kwargs):
        header_auth=request.headers.get("Authorization")
        if not header_auth:
            return jsonify({"error":"Login required"}),401
        
        parts=header_auth.split()

        if len(parts)>2 or parts[0] !="Bearer":
            return jsonify({"error":"Invalid Token Format"})
        
        token=parts[1]

        data=Decode_Token(token)

        if not data:
            return jsonify({"error":"Invalid Token Login again"}),401
        
        return f(*args,user_id=data["userId"],**kwargs)
    return required

        
