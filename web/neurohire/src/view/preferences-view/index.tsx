import React, { useState } from "react";
import { Box, Typography, Divider, Snackbar, Alert } from "@mui/material";

import Section from "./components/Section";
import ProfilePreferences from "./components/ProfilePreferences";
import ModelPreferences from "./components/ModelPreferences";
import NotificationPreferences from "./components/NotificationPreferences";
import RegisterUser from "./components/RegisterUser";
import GDriveIntegration from "./components/GDriveIntegration";
const PreferencesView: React.FC = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [openSections, setOpenSections] = useState({
    profile: false,
    model: false,
    notifications: false,
    register: false,
    gdrive: false,
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    role: "Recruiter",
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handledRegister = () => {
    const { username, email, role } = registerForm;

    if (!username || !email || !role) {
      setSnackbar({
        open: true,
        message: "Please fill all fields.",
        severity: "error",
      });
      return;
    }

    console.log("Registering user:", registerForm);

    setSnackbar({
      open: true,
      message: `Registration email send to ${email} with role ${role}`,
      severity: "success",
    });

    setRegisterForm({ username: "", email: "", role: "Recruiter" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Preferences
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Section
        title="Profile Preferences"
        open={openSections.profile}
        toggle={() => toggleSection("profile")}
      >
        <ProfilePreferences />
      </Section>

      <Section
        title="Model Preferences"
        open={openSections.model}
        toggle={() => toggleSection("model")}
      >
        <ModelPreferences />
      </Section>

      <Section
        title="Notification Preferences"
        open={openSections.notifications}
        toggle={() => toggleSection("notifications")}
      >
        <NotificationPreferences />
      </Section>

      <Section
        title="Register New User"
        open={openSections.register}
        toggle={() => toggleSection("register")}
      >
        <RegisterUser
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          handledRegister={handledRegister}
        />
      </Section>
      <Section
        title="Google Drive Integration"
        open={openSections.gdrive}
        toggle={() => toggleSection("gdrive")}
      >
        <GDriveIntegration />
      </Section>
    </Box>
  );
};

export default PreferencesView;
