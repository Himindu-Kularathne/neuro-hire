import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Button,
} from "@mui/material";
import JobEditForm from "./JobEditCard";

const JobCard: React.FC<{ job: any }> = ({ job }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

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
        {isEditing ? (
          <JobEditForm job={job} handleSave={handleSave} />
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="primary"
              >
                {job.job_name}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setIsEditing(true)}
                sx={{ mb: 2 }}
              >
                Edit
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {job.description}
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Skills Required:
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {job?.skills_required?.map((skill: string, index: number) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ fontSize: "0.8rem" }}
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
            <Typography variant="body2" color="text.secondary" mb={2}>
              {job.education_required}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JobCard;
