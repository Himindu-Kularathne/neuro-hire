import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { APP_DATA } from "../../utils/constants";
import "./Header.css";
import { Link } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#fff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" className="title">
          {APP_DATA.APP_NAME}
        </Typography>
        <Box>
          <Link to="/home">
            <Button color="inherit" className="nav-link">
              Home
            </Button>
          </Link>
          <Link to="/jobs/owned">
            <Button color="inherit" className="nav-link">
              Jobs
            </Button>
          </Link>
          <Link to="/jobs/add">
            <Button color="inherit" className="nav-link">
              New Job
            </Button>
          </Link>
          <Link to="/jobs/gdrive">
            <Button color="inherit" className="nav-link">
              GDrive
            </Button>
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="secondary" variant="outlined">
            Sign in
          </Button>
          <Button color="secondary" variant="contained">
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
