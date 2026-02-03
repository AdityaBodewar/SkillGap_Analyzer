import pdfplumber
import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python","java","javascript","react","node","mongodb",
    "html","css","sql","git","docker"
]

def parse_resume(file):
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text()

    text = text.lower()
    found_skills = [skill for skill in SKILLS_DB if skill in text]

    return text, found_skills
