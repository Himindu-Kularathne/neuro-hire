import AppHandler from "./AppHandler";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
// import "./App.css";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <AppHandler />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
