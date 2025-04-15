from fastapi import FastAPI
from quickstart import create_folder,multipart_upload;

app = FastAPI()

@app.get("/")
def root():
    return {"message":"Google drive service is running"}

@app.post("/create-folder")
def create_drive_folder():
    folder_id = create_folder()
    return {"folderId": folder_id}

@app.post("/upload-cv")
def upload_cv():
    file_id = multipart_upload()
    return{"fileId":file_id}
