import pdfplumber
import spacy
import pandas as pd
import numpy as np
import re
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# ------------------ Configuration & NLP ------------------
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback if model isn't downloaded
    import os
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Load your dataset
# df = pd.read_csv("job_readiness_dataset.csv") 

# ------------------ Core Helper Functions ------------------

def clean_text(text):
    """Professional text cleaning for better matching"""
    text = text.lower()
    # Remove special characters but keep C++, C#, .NET etc.
    text = re.sub(r'[^a-zA-Z0-9+#.\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_text_from_pdf(file_path):
    """Safely extract and clean text from PDF"""
    full_text = ""
    try:
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    full_text += page_text + " "
        return clean_text(full_text)
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return None

def get_skills_from_text(text, skill_library):
    """Extracts known skills from raw text using boundary matching"""
    found_skills = []
    for skill in skill_library:
        # Use regex to find exact matches only (preventing 'java' matching in 'javascript')
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text):
            found_skills.append(skill.lower())
    return list(set(found_skills))

# ------------------ Main Analysis Engine ------------------
def analyze_resume_v2(file_path, df, target_job_title=None):
    try:
        # 1. Prepare Resume Data
        resume_text = extract_text_from_pdf(file_path)
        if not resume_text:
            return {"status": "error", "message": "PDF is unreadable or empty."}
        
        # Build skill library from CSV
        all_possible_skills = set()
        for col in ['main_skill', 'additional_skills']:
            df[col].dropna().apply(lambda x: [all_possible_skills.add(s.strip().lower()) for s in str(x).split(',')])
        
        user_skills = get_skills_from_text(resume_text, all_possible_skills)
        if not user_skills:
            return {"status": "error", "message": "No technical skills identified."}

        # 2. Robust Job Selection (The Fix for 422)
        target_df = pd.DataFrame()
        if target_job_title:
            # Try exact match first
            target_df = df[df['job_role'].str.contains(re.escape(target_job_title), case=False, na=False)]
        
        # Fallback: If title not found or not provided, pick the job with highest skill overlap
        if target_df.empty:
            df['temp_match'] = df['main_skill'].apply(lambda x: len(set(str(x).lower().split(',')) & set(user_skills)))
            target_df = df.sort_values(by='temp_match', ascending=False).head(1)

        row = target_df.iloc[0]

        # 3. Calculation Logic
        required_skills = [s.strip().lower() for s in str(row['main_skill']).split(",") if s.strip()]
        bonus_skills = [s.strip().lower() for s in str(row['additional_skills']).split(",") if s.strip()]
        
        main_matches = set(user_skills) & set(required_skills)
        bonus_matches = set(user_skills) & set(bonus_skills)
        
        score_num = (len(main_matches) * 2.0) + (len(bonus_matches) * 1.0)
        score_den = (len(required_skills) * 2.0) + (len(bonus_skills) * 1.0)
        
        # Avoid Division by Zero
        weighted_match_percentage = (score_num / score_den) * 100 if score_den > 0 else 0

        # 4. Semantic Similarity
        corpus = [" ".join(user_skills), " ".join(required_skills + bonus_skills)]
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(corpus)
        semantic_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        # 5. Result Generation
        is_ready = weighted_match_percentage >= 70
        missing_skills = list(set(required_skills) - set(user_skills))

        return {
            "status": "success",
            "match_score": f"{round(weighted_match_percentage, 1)}%",
            "semantic_similarity": round(float(semantic_sim), 2),
            "job_readiness": "Job Ready" if is_ready else "Needs Upskilling",
            "matched_skills": list(main_matches | bonus_matches),
            "missing_skills": missing_skills[:5], # Limit to top 5
            "target_role": row['job_role'],
            "skill_roadmap": [
                {"skill": s.title(), "priority": "Critical", "timeframe": "2 Weeks"} 
                for s in missing_skills[:3]
            ]
        }
    except Exception as e:
        return {"status": "error", "message": f"Internal Engine Error: {str(e)}"}

# ------------------ Example Usage ------------------
# if __name__ == "__main__":
#     dataset = pd.read_csv("your_data.csv")
#     results = analyze_resume_v2("my_resume.pdf", dataset, "Backend Developer")
#     print(results)