import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const StepResult: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Processing...
      </Typography>
      <CircularProgress sx={{ my: 2 }} />
      <Typography variant="body1">
        Analysis complete. Sample Results:
      </Typography>
      <Typography variant="body2" mt={2}>
        - John Doe: 92% match
        <br />
        - Jane Smith: 78% match
        <br />- Alex Johnson: 85% match
      </Typography>
    </Box>
  );
};

export default StepResult;
