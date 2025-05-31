import React, { useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";

interface Props {
  files: File[];
  filePreviews: { name: string; src: string | null }[];
  loading: boolean;
  onDrop: (files: File[]) => void;
  removeFile: (fileName: string) => void;
  onSubmit: () => void;
}

const StepUpload: React.FC<Props> = ({
  files,
  filePreviews,
  loading,
  onDrop,
  removeFile,
  onSubmit,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    multiple: true,
  });

  return (
    <>
      <Typography variant="body1" mb={2}>
        Drag and drop your resumes here or click to upload. Supported formats:
        PDF, DOC, DOCX.
      </Typography>

      <Paper
        elevation={4}
        {...getRootProps()}
        sx={{
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
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />

        {files.length === 0 ? (
          <>
            <CloudUploadIcon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} />
            <Typography variant="subtitle1" align="center">
              {isDragActive
                ? "Drop your resumes here..."
                : "Click or drag to upload resumes"}
            </Typography>
          </>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle1" mb={1}>
              Preview Resumes:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {filePreviews.map((file) => (
                <Box
                  key={file.name}
                  sx={{
                    position: "relative",
                    width: 100,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    textAlign: "center",
                    background: "#f7f7f7",
                  }}
                >
                  {file.src ? (
                    <img
                      src={file.src}
                      alt={file.name}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <Typography variant="body2" sx={{ p: 1 }}>
                      {file.name}
                    </Typography>
                  )}
                </Box>
              ))}
              <IconButton size="large">
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Paper>

      {files.length > 0 && (
        <Paper elevation={3} sx={{ mt: 4, maxWidth: 600, p: 2 }}>
          <Typography variant="h6">Uploaded Files:</Typography>
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

          <Box textAlign="right" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Resumes"}
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default StepUpload;
