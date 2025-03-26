import chromadb
from sentence_transformers import SentenceTransformer
from typing import List
import logging



class ChromaDBService:
    def __init__(self):
        # Initialize Chroma client
        self.client = chromadb.Client()
        self.collection = self.client.create_collection(name="my_collection")
        
        # Initialize sentence transformer for embedding
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def add_document(self, doc_id: str, text: str):
        # Convert text to embedding
        embedding = self.model.encode([text])[0]
        self.collection.add(
            ids=[doc_id],
            embeddings=[embedding],
            metadatas=[{"text": text}]
        )
    
    def get_document(self, doc_id: str):
        result = self.collection.get(ids=[doc_id])
        return result
    
    def delete_document(self, doc_id: str):
        self.collection.delete(ids=[doc_id])
    
    def update_document(self, doc_id: str, new_text: str):
        # Delete the old document and add the new one
        self.delete_document(doc_id)
        self.add_document(doc_id, new_text)
    
    def query_documents(self, query: str, top_n=5) -> List[str]:
        # Your existing code logic
        query_vector = self.model.encode([query])[0]
        results = self.collection.query(
            query_embeddings=[query_vector],
            n_results=top_n
        )
        doc_ids = results.get("ids", [])
        logging.info(f"Query results: {doc_ids}")
        doc_ids = [str(doc) for sublist in doc_ids for doc in sublist if doc]

        return doc_ids if doc_ids else [""]
    
    def get_all_documents(self):
        results = self.collection.query(
            query_texts="",
            n_results=100
        )
        return results['documents']