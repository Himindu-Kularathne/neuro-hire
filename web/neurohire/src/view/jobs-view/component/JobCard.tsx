/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Tooltip,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import JobEditForm from "./JobEditCard";

const JobCard: React.FC<{ job: any }> = ({ job }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <>
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
          position: "relative",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="start"
            mb={1}
          >
            <Typography variant="h6" fontWeight="bold" color="primary">
              {job.job_name}
            </Typography>
            <Tooltip title="Edit Job" arrow>
              <IconButton
                size="small"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {job.description}
          </Typography>

          <Box mb={2}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Skills Required:
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {job.skills_required?.map((skill: string, index: number) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              ))}
            </Stack>
          </Box>

          <Typography variant="subtitle2" fontWeight="bold">
            Experience:
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {job.experience}
          </Typography>

          <Typography variant="subtitle2" fontWeight="bold">
            Education:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.education_required}
          </Typography>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <DialogTitle sx={{ fontWeight: "bold", pb: 0 }}>
          Edit Job: {job.job_name}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Divider sx={{ mb: 2 }} />
          <JobEditForm job={job} handleSave={handleSave} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;
