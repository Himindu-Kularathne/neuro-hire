import React from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { inviteUsers } from "../../../api/main/invite/inviteManager";

const roleOptions = ["Admin", "Recruiter", "HR Manager", "Interviewer"];

interface RegisterUserProps {
  registerForm: {
    username: string;
    email: string;
    role: string;
  };
  setRegisterForm: React.Dispatch<
    React.SetStateAction<{
      username: string;
      email: string;
      role: string;
    }>
  >;
  handledRegister: () => void;
}

const RegisterUser: React.FC<RegisterUserProps> = ({
  registerForm,
  setRegisterForm,
  handledRegister,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="User Name"
          name="username"
          value={registerForm.username}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={registerForm.email}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          value={registerForm.role}
          onChange={handleInputChange}
        >
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handledRegister}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterUser;
