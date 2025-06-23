// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <Button color="secondary" variant="contained">
          {" "}
          Go Home{" "}
        </Button>
      </Link>
    </Box>
  );
}
