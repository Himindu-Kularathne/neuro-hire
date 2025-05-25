import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Box, Button, Paper, Typography } from "@mui/material";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
];

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  console.log("Client", CLIENT_ID);

  const handleCredentialResponse = async (response: any) => {
    const jwt = response.credential;
    console.log("JWT:", jwt);

    // Exchange JWT for access token (requires backend), or request token directly using `token client`
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        setToken(tokenResponse.access_token);
        setIsSignedIn(true);
        console.log("Access token:", tokenResponse.access_token);
      },
    });

    tokenClient.requestAccessToken();
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    }
  }, [token]);

  interface ExtendedGoogleAuthConfig {
    client_id: string;
    callback: (response: any) => void;
    auto_select?: boolean;
  }

  const authConfig: ExtendedGoogleAuthConfig = {
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
  };

  const handleSignOut = () => {
    if (token) {
      // Revoke the token (runtime-safe)
      (window.google.accounts.oauth2 as any).revoke(token, () => {
        console.log("Access token revoked");
        localStorage.removeItem("access_token");
        setToken(null);
        setIsSignedIn(false);
      });
    } else {
      // Just clear state if no token
      localStorage.removeItem("access_token");
      setToken(null);
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    // Load GAPI client
    gapi.load("client", () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      });
    });

    // Initialize GIS
    window.google.accounts.id.initialize(authConfig);

    // Show button
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv")!,
      {
        theme: "outline",
        size: "large",
      },
    );

    window.google.accounts.id.prompt(
      (notification: google.accounts.id.PromptMomentNotification) => {
        if (notification.isNotDisplayed()) {
          console.log(
            "One Tap not displayed:",
            notification.getNotDisplayedReason(),
          );
        }
        if (notification.isSkippedMoment()) {
          console.log("User skipped One Tap");
        }
      },
    );

    // Optional auto prompt
    // window.google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
      setIsSignedIn(true);
    }
  }, []);

  const signInDiv = document.getElementById("googleSignInDiv");
  if (signInDiv) {
    window.google.accounts.id.renderButton(signInDiv, {
      theme: "filled_blue",
      size: "large",
      shape: "pill",
      width: 300,
      text: "continue_with",
      logo_alignment: "left",
    });
  }

  return (
    <div style={{ padding: 32 }}>
      <Paper
        elevation={0}
        sx={{ padding: 4, maxWidth: 1400, margin: "0 auto" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary">
            Resume Organization Made Easy
          </Typography>

          <Typography variant="h6">
            When you submit resumes for screening, we’ll automatically create a
            folder named after the job title. Inside, you’ll find:
          </Typography>

          <Typography variant="h6" sx={{ ml: 2 }}>
            • <strong> 📁 All CVs</strong> – Contains every submitted resume.
            <br />• <strong>✅ Selected CVs</strong> – Stores only the
            shortlisted candidates.
          </Typography>

          <Typography variant="h6">
            Connecting your Google Drive keeps your resume data organized,
            accessible, and securely stored in your own cloud.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!isSignedIn ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div id="googleSignInDiv" />
            </Box>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" color="success.main" sx={{ mb: 2 }}>
                ✅ Signed in successfully!
              </Typography>
              <Button variant="outlined" color="error" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default App;
