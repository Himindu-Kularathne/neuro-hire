import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

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

  return (
    <div style={{ padding: 20 }}>
      <h2>Google Drive Integration</h2>

      {!isSignedIn ? (
        <div id="googleSignInDiv"></div>
      ) : (
        <>
          <div>Signed in successfully!</div>
        </>
      )}
    </div>
  );
}

export default App;
