from pydantic import BaseModel
from typing import List, Optional

class DocumentCreateRequest(BaseModel):
    doc_id: str
    text: str

class QueryRequest(BaseModel):
    query: str
    top_n: Optional[int] = 5

class DocumentResponse(BaseModel):
    doc_id: str
    text: str
