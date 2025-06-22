import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useJob } from "../../../context/JobContext";
import { useResume } from "../../../context/ResumeContext";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import noJobsAnimation from "../../../assets/annimations/empty.json";

interface JobListProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function JobList({ onNext, onPrev }: JobListProps) {
  const { jobs, fetchJobsData, jobsLoading } = useJob();
  const { selectedJob, setSelectedJob, setNumCVs, numCVs } = useResume();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setNumCVs(value >= 1 ? value : 1); // Update global state
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobsData();
  }, []);

  const handleSelect = (job: any) => {
    setSelectedJob(job);
  };

  if (jobsLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  console.log("whjattt");
  if (!jobsLoading && jobs.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Box sx={{ width: 300 }}>
          <Lottie animationData={noJobsAnimation} loop autoplay />
        </Box>
        <Typography variant="h6" mt={2}>
          No jobs found!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 3 }}
          onClick={() => navigate("/jobs/add")}
        >
          Create New Job
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Select a Job
          </Typography>
        </motion.div>

        <TextField
          label="Successful CVs Required"
          type="number"
          inputProps={{ min: 1 }}
          value={numCVs}
          onChange={handleChange}
          size="small"
          sx={{ width: "200px" }}
        />
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent={jobs.length < 3 ? "center" : "flex-start"}
      >
        <AnimatePresence>
          {jobs &&
            jobs.map((job: any) => {
              const isSelected = selectedJob?.job_id === job.job_id;

              // Dynamically control card width
              const gridSize =
                jobs.length === 1 ? 12 : jobs.length === 2 ? 6 : 4; // default for 3+ jobs

              return (
                <Grid item xs={12} sm={gridSize} md={gridSize} key={job.job_id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      onClick={() => handleSelect(job)}
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        cursor: "pointer",
                        p: 1,
                        background: isSelected
                          ? "linear-gradient(135deg, #bbdefb, #e3f2fd)"
                          : "linear-gradient(135deg, #ffffff, #f5f5f5)",
                        boxShadow: isSelected
                          ? "0 4px 20px rgba(25, 118, 210, 0.4)"
                          : "0 2px 10px rgba(0,0,0,0.08)",
                        border: isSelected
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                        transform: isSelected ? "scale(1.03)" : "scale(1)",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.04)",
                          background:
                            "linear-gradient(135deg, #e3f2fd, #ffffff)",
                          boxShadow: "0 6px 24px rgba(25, 118, 210, 0.2)",
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            color: isSelected ? "#0d47a1" : "primary.main",
                          }}
                        >
                          {job.job_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                        >
                          Experience Required: {job.experience}
                        </Typography>

                        {/* ✅ Show description only if less than 3 jobs */}
                        {jobs.length < 3 && (
                          <Typography
                            variant="body2"
                            mt={1}
                            sx={{
                              color: "#555",
                              lineHeight: 1.6,
                            }}
                          >
                            {job.description || "No description provided."}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
        </AnimatePresence>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            onClick={onPrev}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: 3,
              fontWeight: "bold",
            }}
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            disabled={!selectedJob}
            sx={{
              borderRadius: 3,
              fontWeight: "bold",
              boxShadow: selectedJob
                ? "0 4px 12px rgba(25, 118, 210, 0.3)"
                : "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Next
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
