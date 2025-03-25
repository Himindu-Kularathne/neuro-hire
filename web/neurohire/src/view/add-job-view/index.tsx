import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
} from "@mui/material";

export default function AddJob() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    skills: [] as string[],
    experience: "",
    education: "",
  });

  const [skillInput, setSkillInput] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Add skill to array
  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({ ...jobData, skills: [...jobData.skills, skillInput] });
      setSkillInput(""); // Clear input
    }
  };

  // Remove skill from array
  const handleDeleteSkill = (skillToDelete: string) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter((skill) => skill !== skillToDelete),
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Data Submitted:", jobData);
    // TODO: Send data to backend
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add Job
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          {/* Job Description */}
          <TextField
            fullWidth
            label="Job Description"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            required
            multiline
            rows={3}
            margin="normal"
          />

          {/* Skills Input */}
          <TextField
            fullWidth
            label="Add Skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            margin="normal"
          />
          <Button
            onClick={handleAddSkill}
            variant="outlined"
            color="primary"
            sx={{ mt: 1, mb: 2 }}
          >
            Add Skill
          </Button>

          {/* Skill Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {jobData.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleDeleteSkill(skill)}
                color="primary"
              />
            ))}
          </Stack>

          {/* Experience */}
          <TextField
            fullWidth
            label="Experience (e.g., 2+ years)"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            required
            margin="normal"
          />

          {/* Education */}
          <TextField
            fullWidth
            label="Education (e.g., Bachelor's in CS)"
            name="education"
            value={jobData.education}
            onChange={handleChange}
            required
            margin="normal"
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit Job
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
