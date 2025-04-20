import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "column",
      }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Backdrop>
  );
};

export default Loader;
