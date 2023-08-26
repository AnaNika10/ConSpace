import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";

export default function UserProfile() {
  const [name, setName] = useState("John");
  const [surname, setSurname] = useState("Doe");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSurname(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleUpdateProfile = () => {
    // Handle the profile update logic here (e.g., making an API call)
    // This is just a placeholder for demonstration purposes
    alert("Profile updated successfully!");
  };

  return (
    <Container maxWidth="sm">
      <div>
        <AccountCircle fontSize="large" />
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={handleNameChange}
          margin="normal"
        />
      </div>
      <div>
        <AccountCircle fontSize="large" />
        <TextField
          label="Surname"
          fullWidth
          value={surname}
          onChange={handleSurnameChange}
          margin="normal"
        />
      </div>
      <div>
        <Lock fontSize="large" />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdateProfile}
        style={{ marginTop: "20px" }}
      >
        Update Profile
      </Button>
    </Container>
  );
}
