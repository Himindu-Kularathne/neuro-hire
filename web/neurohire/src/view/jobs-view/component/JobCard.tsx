import React from "react";
import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";

// Define Job Description Type
interface JobDescription {
  title: string;
  description: string;
  skills: string[];
  experience: string;
  education: string;
}

// Props Interface
interface JobCardProps {
  job: JobDescription;
}

// JobCard Component
const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card sx={{ maxWidth: 500, m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {job.description}
        </Typography>

        <Typography variant="body2" fontWeight="bold" mt={2}>
          Skills Required:
        </Typography>
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
          {job.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>

        <Typography variant="body2" fontWeight="bold" mt={2}>
          Experience:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.experience}
        </Typography>

        <Typography variant="body2" fontWeight="bold" mt={2}>
          Education:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.education}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
