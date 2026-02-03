def generate_roadmap(missing_skills):
    roadmap = []
    for skill in missing_skills:
        roadmap.append({
            "skill": skill,
            "duration": "1-2 weeks",
            "resource": f"Learn {skill} from free online courses"
        })
    return roadmap
