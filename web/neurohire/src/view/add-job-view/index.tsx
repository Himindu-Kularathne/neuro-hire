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

export default function AddJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    skills: [] as string[],
    experience: "",
    education: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter((skill) => skill !== skillToDelete),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Data Submitted:", jobData);
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
            name="title"
            value={jobData.title}
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
          {jobData.skills.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              mt={2}
              sx={{ maxHeight: 120, overflowY: "auto" }}
            >
              {jobData.skills.map((skill, index) => (
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
            name="education"
            value={jobData.education}
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
          >
            Submit Job
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
