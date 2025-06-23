// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import React from "react";
import {
  Box,
  Typography,
  Paper,
  Collapse,
  IconButton,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Section: React.FC<{
  title: string;
  open: boolean;
  toggle: () => void;
  children: React.ReactNode;
}> = ({ title, open, toggle, children }) => {
  const theme = useTheme();

  return (
    <Box mb={3}>
      <Box
        onClick={toggle}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.grey[100],
          px: 2,
          py: 1.5,
          borderRadius: 2,
          cursor: "pointer",
          boxShadow: 1,
          "&:hover": {
            backgroundColor: theme.palette.grey[200],
          },
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small">
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mt: 2 }}>
          {children}
        </Paper>
      </Collapse>
    </Box>
  );
};

export default Section;
