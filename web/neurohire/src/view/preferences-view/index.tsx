import React, { useState } from "react";
import { Box, Typography, Divider, Snackbar, Alert } from "@mui/material";

import Section from "./components/Section";
import ProfilePreferences from "./components/ProfilePreferences";
import ModelPreferences from "./components/ModelPreferences";
import NotificationPreferences from "./components/NotificationPreferences";
import RegisterUser from "./components/RegisterUser";
import GDriveIntegration from "./components/GDriveIntegration";
import { inviteUsers } from "../../api/main/invite/inviteManager";
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

  const handledRegister = async () => {
    const { username, email, role } = registerForm;

    if (!username || !email || !role) {
      setSnackbar({
        open: true,
        message: "Please fill all fields.",
        severity: "error",
      });
      return;
    }

    try {
      const response = await inviteUsers({
        userName: registerForm.username,
        email: registerForm.email,
        role: registerForm.role,
      });
      console.log("Invite response:", response);
      setSnackbar({
        open: true,
        message: "User invited successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error inviting user:", error);
      setSnackbar({
        open: true,
        message: "Failed to invite user.",
        severity: "error",
      });
    }

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

      {/* <Section
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
      </Section> */}

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
