def analyze_gap(
    user_skills,
    job_skills=None,
    projects=None,
    tools=None
):
    """
    Resume readiness analyzer
    """

    
    job_skills = job_skills or []
    projects = projects or []
    tools = tools or []

    user_skills = set(skill.lower() for skill in user_skills)
    job_skills = set(skill.lower() for skill in job_skills)
    tools = set(tool.lower() for tool in tools)

    # ---------- 1️⃣ Skill Matching ----------
    if job_skills:
        matched_skills = list(user_skills & job_skills)
        missing_skills = list(job_skills - user_skills)
        skill_match_percent = int((len(matched_skills) / len(job_skills)) * 100)
    else:
        matched_skills = list(user_skills)
        missing_skills = []
        skill_match_percent = min(70, len(user_skills) * 5)  # cap when no JD

    # ---------- 2️⃣ Skill Strength Score ----------
    skill_score = min(25, len(user_skills) * 2)

    # ---------- 3️⃣ Project Evaluation ----------
    project_score = 0
    if projects:
        project_score += min(30, len(projects) * 10)

    # ---------- 4️⃣ Industry Tools ----------
    industry_tools = {"git", "docker", "aws", "github", "ci/cd"}
    tool_score = min(10, len(tools & industry_tools) * 5)

    # ---------- 5️⃣ Role Detection ----------
    role_map = {
        "frontend": {"react", "html", "css", "javascript"},
        "backend": {"node", "java", "python", "sql"},
        "fullstack": {"react", "node", "sql", "mongodb"},
        "ai/ml": {"python", "ml", "tensorflow", "nlp"}
    }

    role_fit = []
    for role, req_skills in role_map.items():
        if len(user_skills & req_skills) >= 2:
            role_fit.append(role)

    # ---------- 6️⃣ Final Resume Score ----------
    resume_score = (
        skill_match_percent * 0.3 +
        skill_score +
        project_score +
        tool_score
    )
    resume_score = min(100, int(resume_score))

    # ---------- 7️⃣ Readiness Decision ----------
    if resume_score >= 80:
        readiness = "Job Ready"
    elif resume_score >= 60:
        readiness = "Almost Ready"
    elif resume_score >= 40:
        readiness = "Needs Improvement"
    else:
        readiness = "Not Job Ready"

    # ---------- 8️⃣ Improvement Suggestions ----------
    suggestions = []
    if project_score < 20:
        suggestions.append("Add more real-world projects")
    if tool_score < 5:
        suggestions.append("Learn Git, Docker, or Cloud deployment")
    if not role_fit:
        suggestions.append("Focus resume towards a specific role")

    return {
        "resume_score": resume_score,
        "job_readiness": readiness,
        "skill_match": skill_match_percent,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "best_fit_roles": role_fit,
        "strengths": list(user_skills),
        "improvement_areas": suggestions
    }
