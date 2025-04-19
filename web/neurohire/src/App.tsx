import AppHandler from "./AppHandler";
import { AuthProvider } from "./context/AuthContext";
// import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppHandler />
    </AuthProvider>
   
  );
}

export default App;
