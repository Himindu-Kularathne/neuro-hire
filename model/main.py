from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

from langchain.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain.schema.output_parser import StrOutputParser
from langchain_google_genai import GoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.docstore.document import Document

# Define request and response models
class Resume(BaseModel):
    id: str
    content: str

class RequestBody(BaseModel):
    jobDescription: str
    resumes: List[Resume]

class ResponseBody(BaseModel):
    ranked_ids: List[str]

# Initialize FastAPI app
app = FastAPI()

# Initialize components once
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

llm = GoogleGenerativeAI(
    model="models/gemini-1.5-pro-latest",
    google_api_key="<API-Key>",  # Replace with secure loading in prod
    temperature=0.1,
    max_output_tokens=500,
)

output_parser = StrOutputParser()

template = """
Given a job description, identify how relevant the CV is based on the provided context.

Job Description:
{question}

CV Content:
{context}

Relevance (highly relevant, somewhat relevant, not relevant):
"""

prompt = ChatPromptTemplate.from_template(template)

chain = (
    {"context": RunnablePassthrough(), "question": RunnablePassthrough()}
    | prompt
    | llm
    | output_parser
)

@app.post("/rank-resumes", response_model=ResponseBody)
def rank_resumes(request: RequestBody):
    try:
        # Convert to langchain Documents
        documents = [
            Document(page_content=resume.content, metadata={"id": resume.id})
            for resume in request.resumes
        ]

        # Optional: split for better embedding chunking
        splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=50)
        split_docs = splitter.split_documents(documents)

        # Vectorstore and retrieval
        vectorstore = Chroma.from_documents(split_docs, embedding=embedding_model)
        retriever = vectorstore.as_retriever(search_kwargs={"k": len(request.resumes)})

        # Retrieve based on job description
        retrieved_docs = retriever.get_relevant_documents(request.jobDescription)  # Use get_relevant_documents instead of invoke

        # Rank documents based on similarity (optional scoring step if needed)
        ranked_ids = [doc.metadata["id"] for doc in retrieved_docs]  # If you have a score, you could sort this list

        return ResponseBody(ranked_ids=ranked_ids)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
