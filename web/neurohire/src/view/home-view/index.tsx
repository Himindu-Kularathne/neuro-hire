import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { extractTextFromFile } from "../../utils/cv-parser";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // Append new files
  }, []);

  // Handle file removal
  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "application/msword": [".doc", ".docx"] },
    multiple: true, // Allow multiple files
  });

  // Handle submit - print all names of pdfs
  const handledSubmit = async () => {
    setLoading(true); // Set loading state
  
    try {
      for (const file of files) {
        // Extract text from the file
        const text = await extractTextFromFile(file);
        
        // Now call your sendCvToBackend function with the extracted text
        console.log("Extracted text from file:", file.name, text);
      }
      // Optionally, reset loading state after all files are processed
      setLoading(false); 
    } catch (error) {
      console.error("Error during file processing:", error);
      setLoading(false); // Reset loading on error
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        This is my home view
      </Typography>

      {/* Drag & Drop Area */}
      <Paper
        {...getRootProps()}
        sx={{
          width: "80%",
          maxWidth: 500,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: "2px dashed #1976d2",
          bgcolor: isDragActive ? "action.hover" : "background.default",
          cursor: "pointer",
          p: 2,
          mt: 3,
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2" }} />
        <Typography>{isDragActive ? "Drop your resumes here..." : files.length > 0 ? "add more resumes" : "Drag & drop resumes, or click to upload"}</Typography>
      </Paper>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <Box mt={3} width="80%" maxWidth={500}>
          <Typography variant="h6">Uploaded Files:</Typography>
          <List>
            {files.map((file, index) => (
              <ListItem key={index} secondaryAction={
                <IconButton edge="end" onClick={() => removeFile(file.name)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Submit Button */}
      {files.length > 0 && (
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handledSubmit}>
          Submit Resumes
        </Button>
      )}
    </Box>
  );
}
