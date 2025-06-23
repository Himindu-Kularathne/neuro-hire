// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import React from "react";
import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";

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
      <Typography variant="body1" mb={2} textAlign="center">
        Drag and drop your resumes here or click to upload. Supported formats:
        PDF, DOC, DOCX.
      </Typography>
      <Box
        sx={{
          width: "90%",
          maxWidth: "100%",
          mx: "auto",
          mb: 4,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Paper
            elevation={6}
            {...getRootProps()}
            sx={{
              width: "90%",
              minHeight: 260,
              border: "2px dashed #2196f3",
              alignSelf: "center",
              background: isDragActive
                ? "linear-gradient(145deg, #e3f2fd, #ffffff)"
                : "linear-gradient(145deg, #fafafa, #ffffff)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: files.length === 0 ? "center" : "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              p: 4,
              cursor: "pointer",
              borderRadius: 4,
              transition: "all 0.3s ease-in-out",
            }}
          >
            <input {...getInputProps()} />

            {files.length === 0 ? (
              <>
                <CloudUploadIcon
                  sx={{ fontSize: 60, color: "#1976d2", mb: 1 }}
                />
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
                  <AnimatePresence>
                    {filePreviews.map((file) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: 100,
                            border: "1px solid #90caf9",
                            borderRadius: 2,
                            overflow: "hidden",
                            background: "#e3f2fd",
                            textAlign: "center",
                            boxShadow: "0 2px 10px rgba(33, 150, 243, 0.2)",
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
                            },
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
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <IconButton size="large" color="primary">
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Box>
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Paper
            elevation={3}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
              boxShadow: "0 6px 20px rgba(33, 150, 243, 0.15)",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Uploaded Files:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
              }}
            >
              <AnimatePresence>
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: 200,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        border: "1px solid #90caf9",
                      }}
                    >
                      <Typography variant="subtitle2" noWrap>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {(file.size / 1024).toFixed(1)} KB
                      </Typography>

                      <IconButton
                        onClick={() => removeFile(file.name)}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "#f44336",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#d32f2f",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Box>

            <Box textAlign="right" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                disabled={loading || files.length <= 1}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.6)",
                  },
                }}
              >
                {loading ? "Submitting..." : "Submit Resumes"}
              </Button>
            </Box>
          </Paper>
        </motion.div>
      )}
    </>
  );
};

export default StepUpload;
