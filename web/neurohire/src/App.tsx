// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import AppHandler from "./AppHandler";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { ResumeProvider } from "./context/ResumeContext";
import { UserProvider } from "./context/UserContext";
import { SnackbarProvider } from "./utils/snackbar";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <UserProvider>
          <ResumeProvider>
            <JobProvider>
              <AppHandler />
            </JobProvider>
          </ResumeProvider>
        </UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
