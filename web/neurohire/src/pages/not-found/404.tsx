import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">404 | Not Found</Typography>
      <Button color="secondary" variant="contained">
        {" "}
        Go Home{" "}
      </Button>
    </Box>
  );
}
