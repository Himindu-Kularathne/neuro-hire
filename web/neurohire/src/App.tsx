import React from "react";
import Layout from "./layout/Layout";
import AppHeader from "./layout/header/Header";
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
