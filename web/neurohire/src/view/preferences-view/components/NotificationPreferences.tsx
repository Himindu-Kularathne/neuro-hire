import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

const NotificationPreferences: React.FC = () => (
  <>
    <FormControlLabel
      control={<Switch defaultChecked />}
      label="Email notifications"
    />
    <FormControlLabel control={<Switch />} label="SMS alerts" />
    <FormControlLabel control={<Switch />} label="Weekly summary reports" />
  </>
);

export default NotificationPreferences;
