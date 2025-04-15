import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function GDrive() {
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState(null);
  const [folderResponse, setFolderResponse] = useState(null);
  const [fileResponse, setFileResponse] = useState(null);

  const handleFolderCreate = async () => {
    const formData = new FormData();
    formData.append("folder_name", folderName);

    const response = await fetch("http://127.0.0.1:8000/create-folder", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setFolderResponse(data.folderId);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:8000/upload-cv", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setFileResponse(data.fileId);
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Google Drive Uploader
        </Typography>

        {/* Folder Name Input */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Folder Name"
            variant="outlined"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleFolderCreate}
          >
            Create Folder
          </Button>
          {folderResponse && (
            <Typography sx={{ mt: 1 }} color="success.main">
              Folder created with ID: {folderResponse}
            </Typography>
          )}
        </Box>

        {/* File Upload Input */}
        <Box sx={{ mt: 4 }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginBottom: "8px" }}
          />
          <Button
            variant="contained"
            onClick={handleFileUpload}
            disabled={!file}
          >
            Upload File
          </Button>
          {fileResponse && (
            <Typography sx={{ mt: 1 }} color="success.main">
              File uploaded with ID: {fileResponse}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
