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
