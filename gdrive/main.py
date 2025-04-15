from fastapi import FastAPI,UploadFile,File,Form
from quickstart import create_folder,upload_file;

app = FastAPI()

# Main function to indicate that service is running
@app.get("/")
def root():
    return {"message":"Google drive service is running"}

# Creates folder for a given name
@app.post("/create-folder")
def create_drive_folder(folder_name:str = Form(...)):
    folder_id = create_folder(folder_name)
    return {"folderId": folder_id}

# Uploads given file to given folder
@app.post("/upload-cv")
def upload_cv(file:UploadFile = File(...),folder_id: str = Form(...)):
    file_id = upload_file(file,folder_id)
    return{"fileId":file_id}
