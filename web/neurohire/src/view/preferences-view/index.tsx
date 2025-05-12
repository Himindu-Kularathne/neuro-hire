import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Grid,
} from "@mui/material";

const PreferencesView: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Preferences
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Profile Preferences Section */}
      <Typography variant="h6" gutterBottom>
        Profile Preferences
      </Typography>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Display Name"
              defaultValue="Company XYZ"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="example@company.com"
            />
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
      </Paper>

      {/* Model Preferences Section */}
      <Typography variant="h6" gutterBottom>
        Model Preferences
      </Typography>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable AI-assisted screening"
        />
        <FormControlLabel
          control={<Switch />}
          label="Use advanced ranking model"
        />
      </Paper>

      {/* Notification Preferences Section */}
      <Typography variant="h6" gutterBottom>
        Notification Preferences
      </Typography>
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Email notifications"
        />
        <FormControlLabel control={<Switch />} label="SMS alerts" />
        <FormControlLabel control={<Switch />} label="Weekly summary reports" />
      </Paper>
    </Box>
  );
};

export default PreferencesView;
