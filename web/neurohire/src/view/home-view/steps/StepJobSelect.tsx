import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useJob } from "../../../context/JobContext";
import { useResume } from "../../../context/ResumeContext";

interface JobListProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function JobList({ onNext, onPrev }: JobListProps) {
  const { jobs, fetchJobsData, jobsLoading } = useJob();
  const { selectedJob, setSelectedJob } = useResume();

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

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Select a Job
      </Typography>
      <Grid container spacing={3}>
        {jobs?.map((job: any) => {
          const isSelected = selectedJob?.job_id === job.job_id;
          return (
            <Grid item xs={12} sm={6} md={4} key={job.job_id}>
              <Card
                onClick={() => handleSelect(job)}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: isSelected ? 6 : 3,
                  border: isSelected
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                  backgroundColor: isSelected ? "#e3f2fd" : "#fff",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="medium" color="primary">
                    {job.job_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Experience Required: {job.experience}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          onClick={onPrev}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          disabled={!selectedJob}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
