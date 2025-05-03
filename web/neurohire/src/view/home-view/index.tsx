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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { extractTextFromFile } from "../../utils/cv-parser";
import { useUser } from "../../context/UserContext";
import { getProfile } from "../../api/main/profile/profileManager";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

// PDF.js config
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<
    { name: string; src: string | null }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { profile, setProfile } = useUser();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((p) => p.name !== fileName)
    );
  };

  useEffect(() => {
    const generatePreviews = async () => {
      const previews = await Promise.all(
        files.map(async (file) => {
          if (file.type === "application/pdf") {
            const fileReader = new FileReader();
            const result = await new Promise<string | null>((resolve) => {
              fileReader.onload = async () => {
                const typedArray = new Uint8Array(
                  fileReader.result as ArrayBuffer
                );
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({ canvasContext: context!, viewport })
                  .promise;
                resolve(canvas.toDataURL());
              };
              fileReader.onerror = () => resolve(null);
              fileReader.readAsArrayBuffer(file);
            });
            return { name: file.name, src: result };
          } else {
            return { name: file.name, src: null };
          }
        })
      );
      setFilePreviews(previews);
    };

    if (files.length > 0) {
      generatePreviews();
    }
  }, [files]);

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

  const fetchProfileData = async () => {
    try {
      const profile = await getProfile();
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
  }, []);

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

      <Typography variant="body1" color="text.secondary" align="center">
        Drag and drop your resumes here or click to upload. Supported formats:
        PDF, DOC, DOCX.
      </Typography>

      <Paper
        elevation={4}
        {...getRootProps()}
        sx={{
          mt: 3,
          width: "100%",
          maxWidth: 600,
          minHeight: 220,
          border: "2px dashed #1976d2",
          backgroundColor: isDragActive ? "#e3f2fd" : "#ffffff",
          display: "flex",
          alignItems: files.length === 0 ? "center" : "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          p: 3,
          transition: "0.2s ease",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <>
            <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              align="center"
            >
              {isDragActive
                ? "Drop your resumes here..."
                : "Drag & drop resumes here or click to upload"}
            </Typography>
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              Preview Resumes:
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {filePreviews.map((file) => (
                <Box
                  key={file.name}
                  sx={{
                    position: "relative",
                    width: 100,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    overflow: "hidden",
                    textAlign: "center",
                    background: "#f7f7f7",
                    "&:hover .add-icon": {
                      opacity: 1,
                    },
                  }}
                >
                  {file.src ? (
                    <img
                      src={file.src}
                      alt={file.name}
                      style={{ width: "100%", display: "block" }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ p: 1 }}>
                      {file.name}
                    </Typography>
                  )}
                </Box>
              ))}
              <IconButton size="large" className="add-icon">
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
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
