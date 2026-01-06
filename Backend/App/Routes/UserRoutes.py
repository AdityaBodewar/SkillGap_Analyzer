from flask import Blueprint, jsonify,request
from App import extensions
from App.Auth import Generate_Token,IdentityOfUser,isAdmin
from bson import ObjectId


user_bp = Blueprint("users", __name__)

@user_bp.route("/", methods=["GET"])
def get_users():
    try:
        users = list(extensions.db.Users.find())

        if len(users) == 0:
            return jsonify({
                "message": "No users found",
                "users": []
            }), 200

        for user in users:
            user["_id"] = str(user["_id"])

        return jsonify({
            "message": "Users fetched successfully",
            "users": users
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@user_bp.route("/Register",methods=["POST"])
def Register():
    try:
        data=request.get_json()
        if not data.get("Email") or not data.get("Password") or not data.get("Username") or not data.get("Age"):
            return jsonify({"error":"required all fields"}),404
        check_if_already_registered=extensions.db.Users.find_one({"Email":data.get("Email")})

        if check_if_already_registered:
            return jsonify({"error":"Email Already Registered"}),401
        
        extensions.db.Users.insert_one(data)
        return jsonify({"message":"Registered Successfull","User":data.get("Username")}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500




@user_bp.route("/Login",methods=["POST"])
def Login():
    try:
        data=request.get_json()
        if not data.get("Email") or not data.get("Password"):
            return jsonify({"error":"Missing Email or Password "}),404
        check_if_User=extensions.db.Users.find_one({"Email":data.get("Email")})
        check_if_Admin=extensions.db.Admin.find_one({"Email":data.get("Email")})

        if not check_if_User and not check_if_Admin:
            return jsonify({"error":"Email Not Registered"}),401
        
        if check_if_Admin:
            if check_if_Admin["Password"] != data.get("Password"):
                return jsonify({"error":"Invalid Password"}),401
            token =Generate_Token(str(check_if_Admin["_id"]),"Admin")
            return jsonify({"message":"Login Successfull","Token":token,"Role":"Admin"}),200
            
        if check_if_User:

            if  check_if_User["Password"] != data.get("Password"):
                return jsonify({"error":"Invalid Password"}),401
            token=Generate_Token(str(check_if_User["_id"]),"User") 
            return jsonify({"message":"Login Successfull","Token":token,"Role":"user"}),200 
    except Exception as e:
        return jsonify({"error",str(e)}),500

@user_bp.route("/Profile",methods=["Get"])
@IdentityOfUser
def Profile(user_id):
    try:
        
        data=extensions.db.Users.find_one({"_id":ObjectId(user_id)},{"Password":0})
        data["_id"]=str(data["_id"])
        return jsonify({"message":"fetched successfully","userdata":data}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@user_bp.route("/DashBoard",methods=["GET"])
@isAdmin
def Dashboard(user_id):
    try:
            data=extensions.db.Admin.find_one({"_id":ObjectId(user_id)},{"Password":0})
            data["_id"]=str(data["_id"])
            return jsonify({"message":"fetched successfully","userdata":data}),200
        
    except Exception as e:
        return jsonify({"error":str(e)}),500