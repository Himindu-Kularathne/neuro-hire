import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  Box,
  Slide,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import { createJob } from "../../api/main/jobs/jobManager";

export default function AddJob() {
  const [jobData, setJobData] = useState({
    job_name: "",
    description: "",
    skills_required: [] as string[],
    experience: "",
    education_required: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({
        ...jobData,
        skills_required: [...jobData.skills_required, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setJobData({
      ...jobData,
      skills_required: jobData.skills_required.filter(
        (skill) => skill !== skillToDelete,
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Data Submitted:", jobData);
    const response = await createJob(jobData);
    console.log("Response:", response);
    if (response) {
      console.log("Job created successfully:", response);
      setJobData({
        job_name: "",
        description: "",
        skills_required: [],
        experience: "",
        education_required: "",
      });
      setSkillInput("");
    } else {
      console.error("Failed to create job");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 5,
          borderRadius: 3,
          backgroundColor: "#fefefe",
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <WorkIcon sx={{ fontSize: 30, color: "#1976d2", mr: 1 }} />
          <Typography variant="h5" fontWeight={600}>
            Add New Job
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job Title"
            name="job_name"
            value={jobData.job_name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Job Description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />

          {/* Skills Input */}
          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <TextField
              fullWidth
              label="Add Skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddSkill())
              }
              variant="outlined"
            />
            <Button
              onClick={handleAddSkill}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              sx={{ whiteSpace: "nowrap" }}
            >
              Add Skill
            </Button>
          </Box>

          {/* Skill Chips */}
          {jobData.skills_required.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              mt={2}
              sx={{ maxHeight: 120, overflowY: "auto" }}
            >
              {jobData.skills_required.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                  color="primary"
                />
              ))}
            </Stack>
          )}

          <TextField
            fullWidth
            label="Experience (e.g., 2+ years)"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Education (e.g., Bachelor's in CS)"
            name="education_required"
            value={jobData.education_required}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 4 }}
            startIcon={<AddIcon />}
          >
            Submit Job
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
