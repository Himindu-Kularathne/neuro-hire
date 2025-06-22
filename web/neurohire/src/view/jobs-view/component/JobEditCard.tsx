/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

import React, { useState } from "react";
import {
  TextField,
  Typography,
  Stack,
  Box,
  Button,
  Paper,
  Divider,
  Grid,
  Alert,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useJob } from "../../../context/JobContext";
import GlobalSnackbar from "../../../context/Alert";

interface JobEditFormProps {
  job: any;
  handleSave: () => void;
}

const JobEditForm: React.FC<JobEditFormProps> = ({ job, handleSave }) => {
  const [editedJob, setJob] = useState(job);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const { updateJobData } = useJob();

  const handleChange = (field: string, value: any) => {
    setJob({ ...editedJob, [field]: value });
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...editedJob.skills_required];
    newSkills[index] = value;
    setJob({ ...editedJob, skills_required: newSkills });
  };

  const handleAddSkill = () => {
    setJob({
      ...editedJob,
      skills_required: [...editedJob.skills_required, ""],
    });
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...editedJob.skills_required];
    newSkills.splice(index, 1);
    setJob({ ...editedJob, skills_required: newSkills });
  };

  const handleSaveJob = async () => {
    // Basic Validation
    if (
      !editedJob.job_name ||
      !editedJob.description ||
      !editedJob.skills_required.length
    ) {
      setAlert({
        type: "error",
        message: "Please fill in all fields and add at least one skill.",
      });
      return;
    }

    setLoading(true);
    try {
      await updateJobData(editedJob.job_id, editedJob);
      setAlert({ type: "success", message: "Job updated successfully!" });
      handleSave();
    } catch (error) {
      console.error("Error updating job data:", error);
      setAlert({
        type: "error",
        message: "Failed to update job. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
    >
      <Collapse in={alert !== null}>
        {alert && (
          <GlobalSnackbar
            open={alert !== null}
            onClose={() => setAlert(null)}
            severity={alert.type}
            message={alert.message}
          />
        )}
      </Collapse>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Job Name"
            fullWidth
            value={editedJob.job_name}
            onChange={(e) => handleChange("job_name", e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={editedJob.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Skills Required
          </Typography>
          <Stack spacing={1}>
            {editedJob.skills_required.map((skill: string, index: number) => (
              <Box key={index} display="flex" gap={1} alignItems="center">
                <TextField
                  label={`Skill ${index + 1}`}
                  value={skill}
                  fullWidth
                  size="small"
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  required
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveSkill(index)}
                  sx={{ minWidth: "40px", px: 1 }}
                >
                  <Delete fontSize="small" />
                </Button>
              </Box>
            ))}
            <Button
              variant="contained"
              size="small"
              onClick={handleAddSkill}
              startIcon={<Add />}
              sx={{ alignSelf: "flex-start" }}
            >
              Add Skill
            </Button>
            {editedJob.skills_required.length === 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Please add at least one skill.
              </Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Experience"
            fullWidth
            value={editedJob.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Education"
            fullWidth
            value={editedJob.education_required}
            onChange={(e) => handleChange("education_required", e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveJob}
            fullWidth
            sx={{ py: 1.2, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Save Job"
            )}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobEditForm;
