/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { extractTextFromFile } from "../../utils/cv-parser";
import { useResume } from "../../context/ResumeContext";
import { useUser } from "../../context/UserContext";
import { getProfile } from "../../api/main/profile/profileManager";

// Steps
import StepUpload from "./steps/StepUpload";
import StepJobSelect from "./steps/StepJobSelect";
import StepPreview from "./steps/StepPreview";
import StepResult from "./steps/StepResult";
import {
  createFolder,
  uploadFileToFolder,
} from "../gdrive-view/googleDriveHelpers";
import { useSnackbar } from "../../utils/snackbar";
import { processResumes } from "../../api/main/model/modelManager";
import { useJob } from "../../context/JobContext";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const steps = ["Upload Resumes", "Select Job", "Preview", "Results"];

interface FilePreview {
  name: string;
  src: string | null;
}

export default function Home() {
  const snackbar = useSnackbar();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    setResumes,
    filePreviews,
    setFilePreviews,
    selectedJob,
    setFinalResults,
    activeStep,
    setActiveStep,
    getTopicByActiveStep,
  } = useResume();
  const { setProfile } = useUser();
  const { fetchJobsData } = useJob();
  const { numCVs } = useResume();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== fileName));
    setFilePreviews((prevPreviews: FilePreview[]) =>
      prevPreviews.filter((p) => p.name !== fileName),
    );
  };

  const generatePreviews = async () => {
    const previews = await Promise.all(
      files.map(async (file) => {
        if (file.type === "application/pdf") {
          const fileReader = new FileReader();
          const result = await new Promise<string | null>((resolve) => {
            fileReader.onload = async () => {
              const typedArray = new Uint8Array(
                fileReader.result as ArrayBuffer,
              );
              const pdf = await pdfjsLib.getDocument(typedArray).promise;
              const page = await pdf.getPage(1);
              const viewport = page.getViewport({ scale: 1 });
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              await page.render({ canvasContext: context!, viewport }).promise;
              resolve(canvas.toDataURL());
            };
            fileReader.onerror = () => resolve(null);
            fileReader.readAsArrayBuffer(file);
          });
          return { name: file.name, src: result };
        } else {
          return { name: file.name, src: null };
        }
      }),
    );
    setFilePreviews(previews);
  };

  useEffect(() => {
    if (files.length > 0) {
      generatePreviews();
    }
  }, [files]);

  const handleSubmitResumes = async () => {
    setLoading(true);
    try {
      const extractedData: any[] = [];
      for (const file of files) {
        const text = await extractTextFromFile(file);
        extractedData.push({ resume_id: file.name, text });
      }
      setResumes(extractedData);
      setActiveStep(1);
    } catch (error) {}
    setLoading(false);
  };

  // final process resumes
  const handleProcessResumes = async () => {
    try {
      const body = {
        job_description: selectedJob.description,
        tags: selectedJob.skills_required,
        resumes: filePreviews.map((file: any) => ({
          id: file.name,
          content: file.src ? file.src : "",
        })),
      };
      const result = await processResumes(body);
      if (result) {
        setFinalResults(result);
        snackbar.success("Resumes processed successfully.");
        return result;
      }
    } catch (error) {
      snackbar.error("Failed to process resumes.");
    }
  };

  const handleFinalSubmit = async () => {
    setActiveStep(3);
    const result = await handleProcessResumes();
    if (result) {
      await handleGoogleDrive(result);
    }
  };

  const handleGoogleDrive = async (results: any) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must sign in with Google first.");
      return;
    }
    try {
      // creates parent folder based on job name
      const mainFolderId = await createFolder(token, selectedJob.job_name);
      // creates sub folders for All cvs , and selected CVs
      // currently puts all cvs on both folders
      const allCVsFolderId = await createFolder(token, "All CVs", mainFolderId);
      const selectedCvsFolderId = await createFolder(
        token,
        "Selected CVs",
        mainFolderId,
      );

      // Upload all CVs to "All CVs" folder
      for (const file of files) {
        await uploadFileToFolder(token, file, allCVsFolderId);
      }

      // Upload only selected CVs
      const topRankedResumes = results?.ranked_resumes?.slice(0, numCVs) || [];
      for (const resume of topRankedResumes) {
        const file = files.find((f) => f.name === resume.id);
        if (file) {
          await uploadFileToFolder(token, file, selectedCvsFolderId);
        }
      }
      snackbar.success(`Uploaded ${files.length} file(s) to Google Drive.`);
    } catch (err) {
      snackbar.error("Failed to upload to Google Drive.");
    }
  };

  const fetchProfileData = async () => {
    try {
      const profile = await getProfile();
      if (profile) setProfile(profile);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProfileData();
    fetchJobsData();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="primary"
        gutterBottom
        align="center"
      >
        {getTopicByActiveStep(activeStep)}
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Step Components */}
        {activeStep === 0 && (
          <StepUpload
            files={files}
            filePreviews={filePreviews}
            loading={loading}
            onDrop={onDrop}
            removeFile={removeFile}
            onSubmit={handleSubmitResumes}
          />
        )}
        {activeStep === 1 && (
          <StepJobSelect
            onNext={() => setActiveStep(2)}
            onPrev={() => setActiveStep(0)}
          />
        )}
        {activeStep === 2 && (
          <StepPreview
            onSubmit={handleFinalSubmit}
            onPrev={() => setActiveStep(1)}
          />
        )}
        {activeStep === 3 && <StepResult />}
      </div>
    </Box>
  );
}
