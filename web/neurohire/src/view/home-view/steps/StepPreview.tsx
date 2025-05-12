import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  onSubmit: () => void;
}

const StepPreview: React.FC<Props> = ({ onSubmit }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Preview Extracted Resume Data
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Review the parsed data from the resumes before final submission.
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Submit to Screening Engine
        </Button>
      </Box>
    </Box>
  );
};

export default StepPreview;
