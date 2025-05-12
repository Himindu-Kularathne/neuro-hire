import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { login } from "../../api/auth/login";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const { setIsAuthenticated } = useAuth();
  const [mode, setMode] = useState<"menu" | "login" | "register">("menu");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    setLoading(true);
    try {
      const responseData = await login(email, password);
      if (responseData?.accessToken) {
        setIsAuthenticated(true);
        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Login failed!",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    setLoading(true);
    try {
      // Your actual register logic here
      setSnackbar({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
      setMode("menu");
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Registration failed!",
        severity: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Left Image Section */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url("https://img.freepik.com/premium-vector/business-people_48369-7691.jpg?w=740")`, // 👈 replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Form Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f9f9f9",
        }}
      >
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Paper
          elevation={3}
          sx={{ padding: 4, width: "100%", maxWidth: 400, borderRadius: 10 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            NeuroHire
          </Typography>

          {mode === "menu" && (
            <>
              <Button
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => setMode("login")}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setMode("register")}
              >
                Register
              </Button>
            </>
          )}

          {mode === "login" && (
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                Login
              </Button>
              <Button fullWidth onClick={() => setMode("menu")} sx={{ mt: 1 }}>
                Back
              </Button>
            </Box>
          )}

          {mode === "register" && (
            <Box component="form" onSubmit={handleRegister}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                name="role"
                label="Role"
                fullWidth
                margin="normal"
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                Register
              </Button>
              <Button fullWidth onClick={() => setMode("menu")} sx={{ mt: 1 }}>
                Back
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
