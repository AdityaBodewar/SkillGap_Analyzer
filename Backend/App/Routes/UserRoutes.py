from flask import Blueprint, jsonify,request
from App import extensions
from App.Auth import Generate_Token,IdentityOfUser,isAdmin
from bson import ObjectId
from App.Analyzer import analyze_resume_v2
import requests
import pandas as pd
import os

try:
    df = pd.read_csv("job_readiness_dataset.csv")
except Exception as e:
    print(f"Warning: Could not load dataset: {e}")
    df = None

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


# @user_bp.route("/analyze", methods=["POST"])
# def analyze():
#     file = request.files["resume"]
#     role = request.form["role"]

#     resume_text, user_skills = parse_resume(file)
#     job_skills = get_job_skills(role)

#     gap_result = analyze_gap(user_skills, job_skills)
#     roadmap = generate_roadmap(gap_result["missing_skills"])

#     return jsonify({
#         "user_skills": user_skills,
#         "job_skills": job_skills,
#         "skill_match": gap_result["skill_match"],
#         "missing_skills": gap_result["missing_skills"],
#         "resume_score": gap_result["resume_score"],
#         "roadmap": roadmap
#     })

  # your updated function

@user_bp.route("/analyze", methods=["POST"])
def analyze():
    if "resume" not in request.files:
        return jsonify({"status": "error", "message": "No file"}), 400

    file = request.files["resume"]
    target_role = request.form.get("target_role") # Ensure this is 'target_role'

    file_path = f"./temp_{file.filename}"
    file.save(file_path)

    try:
        # Pass the global 'df'
        result = analyze_resume_v2(file_path, df, target_job_title=target_role)
        os.remove(file_path)
        
        # If engine returned error, send 400, else 200
        code = 200 if result["status"] == "success" else 400
        return jsonify(result), code
    except Exception as e:
        if os.path.exists(file_path): os.remove(file_path)
        return jsonify({"status": "error", "message": str(e)}), 500





REMOTIVE_URL = "https://remotive.com/api/remote-jobs"


@user_bp.route("/jobs", methods=["GET"])
def get_all_jobs():
    try:
        response = requests.get(REMOTIVE_URL, headers={"Accept": "application/json"})
        response.raise_for_status()
        jobs_data = response.json()

        job_list = []
        for job in jobs_data.get("jobs", []):
            job_list.append({
                "title": job.get("title"),
                "company": job.get("company_name"),
                "location": job.get("candidate_required_location"),
                "type": job.get("job_type"),
                "url": job.get("url")
            })

        return jsonify({"jobs": job_list})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500



@user_bp.route("/jobs/search", methods=["POST"])
def search_jobs():
    data = request.get_json()
    role = data.get("role", "").strip()

    if not role:
        return jsonify({"error": "Please provide a job role"}), 400

    try:
        params = {"search": role}
        response = requests.get(REMOTIVE_URL, params=params, headers={"Accept": "application/json"})
        response.raise_for_status()
        jobs_data = response.json()

        job_list = []
        for job in jobs_data.get("jobs", []):
            job_list.append({
                "title": job.get("title"),
                "company": job.get("company_name"),
                "location": job.get("candidate_required_location"),
                "type": job.get("job_type"),
                "url": job.get("url")
            })

        return jsonify({"role": role, "jobs": job_list})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500