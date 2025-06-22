# Copyright (c) 2025 Neuro Hire
#
# Licensed under the MIT License.
# See LICENSE file in the project root for full license information.

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os

from langchain_google_genai import GoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.schema.output_parser import StrOutputParser
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
import json
import re

# Set your API key (ensure it is securely loaded in production)
os.environ["GOOGLE_API_KEY"] = "AIzaSyB4f5T4IC582f2rqSkS9g5inahHKqRZLR0"

# Define request schema
class Resume(BaseModel):
    id: str
    content: str

class RankRequest(BaseModel):
    job_description: str
    tags: List[str]
    resumes: List[Resume]

class RankedResume(BaseModel):
    id: str
    content: str
    score: float
    reason: str  # add this

class RankResponse(BaseModel):
    ranked_resumes: List[RankedResume]

# Initialize FastAPI app
app = FastAPI()

# Prompt Template
prompt_template = ChatPromptTemplate.from_template(
    """
You are a helpful assistant tasked with ranking resumes.

Job Description:
{job_description}

Tags:
{tags}

Given the following resumes:
{resumes}

Rank the resumes from most to least relevant.

Return a valid JSON array with the following format, and **only return the JSON**: Dont add any additional text or explanation.
Response should be a list of objects with the following fields: Starting from [ and should end with ].

[
  {{
    "id": "<resume_id>",
    "score": <score_float>,
    "reason": "<Explanation in Markdown format
      - Should be in One or more sub topics with headings and bullet points.
      - Use Emojis to highlight key points
      - Should only contain the things that are relevant to resume Note: Dont add any additional text or explanation
      - If you feel the resume is not relevant, Say "Not Relevant" in the reason field and mention what fields are missing or not relevant to the job description
      >",
  }},
  ...
]
"""
)

# LLM
llm = GoogleGenerativeAI(model="gemini-2.5-flash")

# Chain
chain = (
    {
        "job_description": RunnablePassthrough(),
        "tags": RunnablePassthrough(),
        "resumes": RunnablePassthrough()
    }
    | prompt_template
    | llm
    | StrOutputParser()
)

@app.post("/rank", response_model=RankResponse)
async def rank_resumes(data: RankRequest):
    print("Hihiihi")
    try:
        resumes_input = "\n".join([f"{resume.id}: {resume.content}" for resume in data.resumes])

        response = chain.invoke({
            "job_description": data.job_description,
            "tags": ", ".join(data.tags),
            "resumes": resumes_input
        })

        print("LLM Response:", response)  # Debugging output
      # Clean LLM response: strip markdown code block and extra text
        cleaned_response = re.sub(r"^.*?```json\s*|\s*```.*$", "", response.strip(), flags=re.DOTALL)
        print("Cleaned Response:", cleaned_response)  # Debugging output
        try:
            parsed = json.loads(cleaned_response)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="LLM did not return valid JSON")

        print("Parsed Response:", parsed)  # Debugging output

        ranked_resumes = []
        for result in parsed:
            resume = next((r for r in data.resumes if r.id == result["id"]), None)
            if resume:
                ranked_resumes.append({
                    "id": resume.id,
                    "content": resume.content,
                    "score": float(result["score"]),
                    "reason": result.get("reason", "No reason provided")  # safely add reason
                })



        ranked_resumes = sorted(ranked_resumes, key=lambda x: x["score"], reverse=True)

        return {"ranked_resumes": ranked_resumes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
