import React, { useState } from "react";
import { Form, Input, Button, Modal, message } from "antd";
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword } from "../../auth";
import "./login.css";

const Login: React.FC = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (values: any) => {
    setLoading(true);
    console.log('calling login function')
    try {
      await doSignInWithEmailAndPassword(values.email, values.password);
      message.success("Login successful!");
      setLoginVisible(false);
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      await doCreateUserWithEmailAndPassword(values.email, values.password);
      message.success("Registration successful!");
      setRegisterVisible(false);
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
        {contextHolder}
      <div className="login-card">
        <h1 className="login-title">NeuroHire</h1>

        <Button type="primary" block className="login-button" onClick={() => setLoginVisible(true)}>
          Login
        </Button>

        <Button type="default" block className="register-button" onClick={() => setRegisterVisible(true)}>
          Register
        </Button>
      </div>

      {/* Login Modal */}
      <Modal title="Login" open={isLoginVisible} onCancel={() => setLoginVisible(false)} footer={null}>
        <Form onFinish={handleLogin}>
          <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form>
      </Modal>

      {/* Register Modal */}
      <Modal title="Register" open={isRegisterVisible} onCancel={() => setRegisterVisible(false)} footer={null}>
        <Form onFinish={handleRegister}>
          <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
