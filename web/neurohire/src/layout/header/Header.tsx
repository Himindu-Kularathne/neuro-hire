import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import { APP_DATA } from "../../utils/constants";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: "#ffffff", color: "#333" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* App Name */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 1, color: "#1976d2" }}
        >
          {APP_DATA.APP_NAME}
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {[
            { label: "Home", path: "/home" },
            { label: "Jobs", path: "/jobs/owned" },
            { label: "New Job", path: "/jobs/add" },
            { label: "GDrive", path: "/jobs/gdrive" },
          ].map((nav) => (
            <Button
              key={nav.label}
              component={Link}
              to={nav.path}
              sx={{
                color: "#333",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              {nav.label}
            </Button>
          ))}
        </Box>

        {/* Profile Pic */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt="Profile"
            src="https://via.placeholder.com/40"
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #1976d2",
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
