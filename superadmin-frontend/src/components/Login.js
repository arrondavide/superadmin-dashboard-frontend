import React, { useState } from "react";
import api from "../api/axios";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("token/", { username, password });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      onLogin();
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, mx: "auto", width: 300 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
    </Box>
  );
}