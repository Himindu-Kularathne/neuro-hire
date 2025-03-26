from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from chroma_db import ChromaDBService
from models import DocumentCreateRequest, QueryRequest, DocumentResponse
from typing import List, Dict
import logging


app = FastAPI()

logging.basicConfig(level=logging.INFO)

# Initialize Chroma DB service
chroma_service = ChromaDBService()

@app.post("/documents/", response_model=DocumentResponse)
async def add_document(request: DocumentCreateRequest):
    try:
        chroma_service.add_document(request.doc_id, request.text)
        return DocumentResponse(doc_id=request.doc_id, text=request.text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/documents/{doc_id}", response_model=DocumentResponse)
async def get_document(doc_id: str):
    result = chroma_service.get_document(doc_id)
    if not result['documents']:
        raise HTTPException(status_code=404, detail="Document not found")
    return DocumentResponse(doc_id=doc_id, text=result['documents'][0])

@app.delete("/documents/{doc_id}", status_code=204)
async def delete_document(doc_id: str):
    try:
        chroma_service.delete_document(doc_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/documents/{doc_id}", response_model=DocumentResponse)
async def update_document(doc_id: str, request: DocumentCreateRequest):
    try:
        chroma_service.update_document(doc_id, request.text)
        return DocumentResponse(doc_id=doc_id, text=request.text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/query/", response_model=List[str])
async def query_documents(request: QueryRequest):
    try:
        results = chroma_service.query_documents(request.query, top_n=request.top_n)
        logging.info(f"Query results: {results}")  # ✅ Log the results
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    