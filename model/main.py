from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from transformers import pipeline

app = FastAPI()

# Schemas
class Resume(BaseModel):
    id: str
    content: str

class RAGRequest(BaseModel):
    jobDescription: str
    resumes: List[Resume]

class RankedResume(BaseModel):
    id: str
    score: float

class RankedResponse(BaseModel):
    ranked_resumes: List[RankedResume]

# Load Hugging Face zero-shot-classification pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.post("/rank", response_model=RankedResponse)
def rank_resumes(data: RAGRequest):
    try:
        print("⏳ Received request to /rank resumes")
        results = []

        for i, resume in enumerate(data.resumes):
            print(f"🔍 Processing resume {i+1}/{len(data.resumes)} — ID: {resume.id}")
            hypothesis = data.jobDescription
            premise = resume.content

            result = classifier(premise, candidate_labels=[hypothesis], multi_label=False)
            score = result["scores"][0]
            print(f"📈 Score for Resume {resume.id}: {score:.4f}")

            results.append(RankedResume(id=resume.id, score=score))

        # Sort resumes by score in descending order
        sorted_results = sorted(results, key=lambda x: x.score, reverse=True)
        print(f"🏁 Ranking complete. Top score: {sorted_results[0].score:.4f}")

        return RankedResponse(ranked_resumes=sorted_results)

    except Exception as e:
        print("💥 Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
