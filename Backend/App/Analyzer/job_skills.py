JOB_SKILL_MAP = {
    "Full Stack Developer": [
        "html","css","javascript","react",
        "node","mongodb","git","docker"
    ],
    "Data Scientist": [
        "python","sql","statistics","machine learning"
    ],
    "Data Analyst":[

        "SQL","Excel","Python","Data Visualization tools"
    ],
    "Software Engineer":[
        "Python", "Java","C++","DSA","Git","Debugging"
    ],
    "Frontend Developer":[
        "HTML","CSS","JS","React","Responsive Design"
    ],
    "Backend Developer":[
        "Python","Java","Node.js","Rest APIs","SQL","No SQL Database"
    ],
    "Machine learning Engineer":[
        "Python","Tensorflow","PyTorch","Model Deployment","Cloude Platforms"
    ],
    "DevOps Engineers":[
        "Linux","Docker","Kubernetes","CI/CD Pipelines"
    ],
    "Cybersecurity Anaylst":[
        "Network Security", "SIEM Tools","Cryptography"
    ],
    "Mobile app developer":[
        "Java","Rest APIs", "UI Frameworks"
    ],
    "Cloud Engineers":[
        "AWS","Networking"
    ]
}

def get_job_skills(role):
    return JOB_SKILL_MAP.get(role, [])
