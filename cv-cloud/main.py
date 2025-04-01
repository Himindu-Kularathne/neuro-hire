from fastapi import FastAPI
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

# Initialize the Chroma client
client = chromadb.Client(Settings())

# Create a new collection (if it doesn't exist)
collection_name = "my_collection"
collection = client.create_collection(collection_name) if collection_name not in client.list_collections() else client.get_collection(collection_name)

# Initialize the sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# FastAPI app
app = FastAPI()

# Data model for POST request
class Data(BaseModel):
    id: str
    content: str

@app.post("/add_data/")
async def add_data(data: Data):
    """Add data to ChromaDB"""
    # Convert content to embedding
    embedding = model.encode(data.content)
    
    collection.add(
        documents=[data.content],
        metadatas=[{"id": data.id}],
        ids=[data.id],
        embeddings=[embedding]
    )
    return {"message": "Data added successfully"}

@app.get("/query_data/{query}")
async def query_data(query: str):
    """Query ChromaDB for data"""
    # Convert the query to an embedding
    query_embedding = model.encode(query)

    result = collection.query(query_embeddings=[query_embedding], n_results=5)
    return {"results": result["documents"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
