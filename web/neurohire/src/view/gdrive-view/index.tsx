import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [folderUrl, setFolderUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          const isSigned = authInstance.isSignedIn.get();
          setIsSignedIn(isSignedIn);
          if (isSignedIn) {
            const currentUser = authInstance.currentUser.get();
            const accessToken = currentUser.getAuthResponse().access_token;
            setToken(accessToken);
          }
        })
        .catch((err: any) => {
          console.error("gapi init error", err);
        });
    }

    gapi.load("client:auth2", start);
  }, []);

  const signIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then((user) => {
      const accessToken = user.getAuthResponse().access_token;
      console.log("Access Token: ", accessToken);
      setToken(accessToken);
      setIsSignedIn(true);
    });
  };

  const extractFolderId = (url) => {
    const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };

  const handleUpload = async () => {
    if (!file || !folderId) return alert("Select a file and paste a valid folder link.");

    const metadata = {
      name: file.name,
      parents: [folderId],
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", file);

    const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id", {
      method: "POST",
      headers: new Headers({ Authorization: `Bearer ${token}` }),
      body: form,
    });

    const result = await res.json();
    alert(`Uploaded file with ID: ${result.id}`);
  };

  const handleCreateFolder = async () => {
    if (!folderId) return alert("Paste a valid folder link first.");

    const metadata = {
      name: "New Subfolder",
      mimeType: "application/vnd.google-apps.folder",
      parents: [folderId],
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
    alert(`Created folder with ID: ${result.id}`);
  };

  useEffect(() => {
    console.log("Token changed:", token);
  }, [token]);
  return (
    <div style={{ padding: 20 }}>
      <h2>Google Drive Integration</h2>

      {!isSignedIn ? (
        <button onClick={signIn}>Sign in with Google</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Paste Google Drive Folder Link"
            onChange={(e) => {
              setFolderUrl(e.target.value);
              setFolderId(extractFolderId(e.target.value));
            }}
            style={{ width: "100%", margin: "10px 0", padding: 8 }}
          />

          <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: 10 }} />

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleUpload}>Upload File</button>
            <button onClick={handleCreateFolder}>Create Folder</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
