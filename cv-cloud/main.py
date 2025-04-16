from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

# Initialize Chroma client
client = chromadb.Client(Settings())

# Create or get collection
collection_name = "my_collection"
collection = client.create_collection(collection_name) if collection_name not in client.list_collections() else client.get_collection(collection_name)

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# FastAPI app
app = FastAPI()

# ----------- Request Model -----------
class Metadata(BaseModel):
    original_filename: str
    upload_date: str = None
    source: str = None
    candidate_role: str = None

class ResumeData(BaseModel):
    id: str
    content: str
    metadata: Metadata

# ----------- Endpoints -----------

@app.post("/add_resume/")
async def add_resume(data: ResumeData):
    """Add a resume (text + metadata) to ChromaDB"""
    embedding = model.encode(data.content)

    collection.add(
        documents=[data.content],
        metadatas=[data.metadata.dict()],
        ids=[data.id],
        embeddings=[embedding]
    )
    return {"message": "Resume added successfully"}

@app.get("/query_resume/")
async def query_resume(query: str, n_results: int = 5):
    """Query ChromaDB and get multiple matching resumes"""
    query_embedding = model.encode(query)

    result = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results  
    )
    return {
        "ids": result["ids"],
        "results": result["documents"],
        "metadata": result["metadatas"]
    }


