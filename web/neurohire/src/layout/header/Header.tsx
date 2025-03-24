import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { APP_DATA } from "../../utils/constants";

const AppHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          {APP_DATA.APP_NAME}
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>

          <Button color="inherit">Register</Button>
        </Box>
        <Button color="secondary" variant="contained">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
