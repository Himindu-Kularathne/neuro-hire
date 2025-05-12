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
  const [folderId, setFolderId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [folderName, setFolderName] = useState("");

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

  const extractFolderId = (url: string) => {
    const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };

  const HARDCODED_FOLDER_ID = "16s_GojXO_OULSpOmNaul952oVZrPm-Wm";

  const handleUpload = async () => {
    if (!file || !token)
      return alert("Select a file and paste a valid folder link.");

    const metadata = {
      name: file.name,
      parents: [HARDCODED_FOLDER_ID],
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    const res = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
      {
        method: "POST",
        headers: new Headers({ Authorization: `Bearer ${token}` }),
        body: form,
      }
    );

    const result = await res.json();
    alert(`Uploaded file with ID: ${result.id}`);
  };

  const handleCreateFolder = async () => {
    const metadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    };

    const res = await fetch("https://www.googleapis.com/drive/v3/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    });

    const result = await res.json();
    console.log("RESULT", result);
    alert(`Created folder with ID: ${result.id}`);
  };

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
      }
    );

    window.google.accounts.id.prompt(
      (notification: google.accounts.id.PromptMomentNotification) => {
        if (notification.isNotDisplayed()) {
          console.log(
            "One Tap not displayed:",
            notification.getNotDisplayedReason()
          );
        }
        if (notification.isSkippedMoment()) {
          console.log("User skipped One Tap");
        }
      }
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
          <input
            type="text"
            placeholder="Folder Name"
            onChange={(e) => setFolderName(e.target.value)}
            style={{ width: "100%", margin: "10px 0", padding: 8 }}
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ marginBottom: 10 }}
          />
          <button onClick={handleCreateFolder}>Create Folder</button>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleUpload}>Upload File</button>
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export default App;
