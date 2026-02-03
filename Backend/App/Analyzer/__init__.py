import pdfplumber
import spacy
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

# ------------------ Load NLP ------------------
nlp = spacy.load("en_core_web_sm")

# ------------------ Load Dataset ------------------
df = pd.read_csv("job_readiness_dataset.csv")  # replace with your CSV path

# Combine main and additional skills
df['skills_list'] = df.apply(
    lambda row: [s.strip().lower() for s in str(row['main_skill']).split(",")] + 
                [s.strip().lower() for s in str(row['additional_skills']).split(",")],
    axis=1
)

# Binarize skills for ML model
all_skills = list({skill for skills in df['skills_list'] for skill in skills})
mlb = MultiLabelBinarizer(classes=all_skills)
X_skills = mlb.fit_transform(df['skills_list'])

# Encode target
y_ready = df['is_user_ready_for_job'].apply(lambda x: 1 if str(x).lower()=='yes' else 0)

# Train ML model for job readiness
clf_ready = RandomForestClassifier(n_estimators=100, random_state=42)
clf_ready.fit(X_skills, y_ready)

# ------------------ Resume Parsing ------------------
def parse_resume(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    text = text.lower()
    
    # Extract skills
    found_skills = [skill for skill in all_skills if skill in text]
    
    if not found_skills:
        return None, "Resume does not contain sufficient information for assessment."
    
    return found_skills, None

# ------------------ Skill Gap / Job Recommendation ------------------
def analyze_resume(file_path):
    user_skills, error = parse_resume(file_path)
    if error:
        return {"status": "error", "message": error}
    
    # Job Readiness Prediction
    user_vector = mlb.transform([user_skills])
    ready_pred = clf_ready.predict(user_vector)[0]
    readiness = "Job Ready" if ready_pred==1 else "Not Job Ready"
    
    # Find similar jobs from dataset
    df['skill_overlap'] = df['skills_list'].apply(lambda skills: len(set(skills) & set(user_skills)))
    best_jobs = df.sort_values(by='skill_overlap', ascending=False)['job_role'].unique()[:3].tolist()
    
    # Determine missing skills for top job
    top_job_skills = df[df['job_role']==best_jobs[0]]['skills_list'].iloc[0]
    missing_skills = list(set(top_job_skills) - set(user_skills))
    
    # Build roadmap
    roadmap = [{"skill": s.title(), "duration": "1-2 weeks",
                "resource": f"Learn {s.title()} from online resources"} for s in missing_skills]
    
    return {
        "status": "success",
        "job_readiness": readiness,
        "matched_skills": user_skills,
        "missing_skills": missing_skills,
        "best_fit_jobs": best_jobs,
        "skill_roadmap": roadmap
    }
