import React from "react";
import { Form, Input, Button, Card } from "antd";
import "./login.css";

const Login: React.FC = () => {
  return (
    <div className="login-container">
    <div className = "login-card">  
        <h1 className="login-title">NeuroHire</h1>
      <Button type="primary" block className="login-button">
        Login
      </Button>

      <Button type="default" block className="register-button">
        Register
      </Button>
    </div>
    </div>
  );
};

export default Login;
