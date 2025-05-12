import { Grid, TextField } from "@mui/material";
import React from "react";

const ProfilePreferences: React.FC = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Display Name" defaultValue="Company XYZ" />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField fullWidth label="Email" defaultValue="example@company.com" />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Description"
        defaultValue="Your company description here."
        multiline
        rows={3}
      />
    </Grid>
  </Grid>
);

export default ProfilePreferences;
