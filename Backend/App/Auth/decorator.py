from functools import wraps
from flask import request,jsonify
from .jwt_utils import Decode_Token
import jwt

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
    @wraps(f)
    def required(*args,**kwargs):
        

            header_auth=request.headers.get("Authorization")
            if not header_auth:
                return jsonify({"error":"Login required"}),401
        
            parts=header_auth.split()

            if len(parts)>2 or parts[0] !="Bearer":
                return jsonify({"error":"Invalid Token Format"}),401
        
            token=parts[1]
            try:
                data=Decode_Token(token)
            except jwt.ExpiredSignatureError:
                return jsonify({"error":"Token has Expired Login again"}),403
            except jwt.InvalidTokenError:
                return jsonify({"error":"Token invalid Login again"}),403

        
            return f(*args,user_id=data["userId"],**kwargs)
        
    return required

        
def isAdmin(f):
    @wraps(f)
    def is_Admin(*args,**kwargs):
        
            headers_auth=request.headers.get("Authorization")
            if not headers_auth:
                return jsonify({"error":"Login required"}),401
        
            parts=headers_auth.split(" ")
            if len(parts)<2 or parts[0] !="Bearer":
             return jsonify({"error":"Invalid Token Format"}),401
        
            token=parts[1]
            try:
                data=Decode_Token(token)
            except jwt.ExpiredSignatureError:
                return jsonify({"error":"Token has Expired Login again"}),403
            except jwt.InvalidTokenError:
                return jsonify({"error":"Token invalid Login again"}),403

            if data["Role"] not in ["Admin","admin"]:
                return jsonify({"error":"Admin only "}),403
        
            return f(*args,user_id=data.get("userId"),**kwargs)
       
    return is_Admin