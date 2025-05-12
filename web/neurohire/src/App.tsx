import AppHandler from "./AppHandler";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { ResumeProvider } from "./context/ResumeContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ResumeProvider>
          <JobProvider>
            <AppHandler />
          </JobProvider>
        </ResumeProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
