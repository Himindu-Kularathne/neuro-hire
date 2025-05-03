import AppHandler from "./AppHandler";
import Loader from "./component/LoadingComponent";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <JobProvider>
        <AppHandler />
        </JobProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
