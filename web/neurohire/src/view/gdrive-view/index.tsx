import React, { useEffect, useRef, useState } from "react";
import { gapi } from "gapi-script";
import { Box, Button, Paper, Typography } from "@mui/material";
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = import.meta.env.VITE_GOOGLE_SCOPES;
const DISCOVERY_DOCS = [import.meta.env.VITE_GOOGLE_DISCOVERY_DOCS];

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const tokenClientRef = useRef<any>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
      setIsSignedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    }
  }, [token]);

  useEffect(() => {
    const initClient = async () => {
      gapi.load("client", () => {
        gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS,
        });
      });

      // Set up token client ref
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse: any) => {
          setToken(tokenResponse.access_token);
          setIsSignedIn(true);
        },
      });
    };

    initClient();
  }, []);

  const handleSignOut = () => {
    if (token) {
      window.google.accounts.oauth2.revoke(token, () => {
        localStorage.removeItem("access_token");
        setToken(null);
        setIsSignedIn(false);
      });
    } else {
      localStorage.removeItem("access_token");
      setToken(null);
      setIsSignedIn(false);
    }
  };

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
            • <strong>📁 All CVs</strong> – Contains every submitted resume.
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!isSignedIn ? (
            <>
              <Box mt={2}>
                <Button
                  variant="contained"
                  onClick={() => tokenClientRef.current?.requestAccessToken()}
                >
                  Connect to Google
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Button variant="contained" color="error" onClick={handleSignOut}>
                Disconnect account
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default App;
