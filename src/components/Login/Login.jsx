import {useState} from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({saveUserData}) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    login:'',
    password:''
  });

  const handleSendData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: loginData.username,
        password: loginData.password,
      })
      sessionStorage.setItem("Token",response.data.token)
      saveUserData(response.data.user)
      navigate("/profile");
    } catch (err) {
      alert(err?.response?.data?.msg);
    }
  };

  return (
    <Box sx={{ textAlign: "center", margin: "120px" }}>
      <Paper sx={{ padding: "35px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography paddingBottom="40px" variant="h1">
            Login
          </Typography>
          <TextField
            fullWidth
            placeholder="Username"
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
          <TextField
            fullWidth
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <Button
            fullWidth
            sx={{ padding: "8px 0" }}
            color="warning"
            onClick={() => handleSendData()}
            variant="contained"
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
