import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";

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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
        transition: "0.3s ease",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
          {job.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          {job.description}
        </Typography>

        <Box mb={2}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Skills Required:
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {job.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                size="small"
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>

        <Typography variant="body2" fontWeight="bold">
          Experience:
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {job.experience}
        </Typography>

        <Typography variant="body2" fontWeight="bold">
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
