import React, { useEffect, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { extractTextFromFile } from "../../utils/cv-parser";
import { useUser } from "../../context/UserContext";
import { getProfile } from "../../api/main/profile/profileManager";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {profile,setProfile} =  useUser();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    multiple: true,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const file of files) {
        const text = await extractTextFromFile(file);
        console.log("Extracted text from file:", file.name, text);
      }
    } catch (error) {
      console.error("Error during file processing:", error);
    }
    setLoading(false);
  };

  //--- fetch profile data ---
  const fetchProfileData = async () => {
    try {
      const profile =  await getProfile();
      
      if (profile) {
        setProfile(profile);
        console.log("Profile data fetched successfully:", profile);
      } else {
        console.error("Failed to fetch profile data");
      }
      
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }
  , []);





  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Upload Resumes
      </Typography>

      {/* Instructions for the user */}
      <Typography variant="body1" color="text.secondary" align="center">
        Drag and drop your resumes here or click to upload. Supported formats: PDF, DOC, DOCX.
      </Typography>

      <Paper
        elevation={4}
        {...getRootProps()}
        sx={{
          mt: 3,
          width: "100%",
          maxWidth: 600,
          height: 220,
          border: "2px dashed #1976d2",
          backgroundColor: isDragActive ? "#e3f2fd" : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 3,
          transition: "0.2s ease",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} />
        <Typography variant="subtitle1" color="text.secondary" align="center">
          {isDragActive
            ? "Drop your resumes here..."
            : files.length > 0
            ? "Add more resumes"
            : "Drag & drop resumes here or click to upload"}
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: 600,
            p: 2,
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Uploaded Files:
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeFile(file.name)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? "Submitting..." : "Submit Resumes"}
            </Button>
          </Box>
        </Paper>
      )}
      
    </Box>
  );
}
