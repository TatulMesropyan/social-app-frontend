import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

export const Registration = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    phone: "",
    password: "",
    email: "",
    confirmationPassword: "",
  });
  const [validation, setValidation] = useState(false);
  const [isPasswordsValid, setIsPasswordsValid] = useState(false);
  const navigate = useNavigate();

  const sendRegisteredData = async () => {
    try {
      const registerUser = await axios.post(
        "http://localhost:8080/registration",
        {
          username: registrationData.username,
          email: registrationData.email,
          phone: registrationData.password,
          password: registrationData.password,
        }
      );
      const response = await registerUser;
      if (response.statusText === "OK") {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (
      registrationData?.password === registrationData?.confirmationPassword &&
      registrationData.password.length > 1
    ) {
      setIsPasswordsValid(true);
    } else setIsPasswordsValid(false);

    if (
      registrationData?.email.includes("@") &&
      registrationData.email.length > 1
    ) {
      setValidation(true);
    } else setValidation(false);
  }, [registrationData, validation, isPasswordsValid]);

  const handleFieldChange = (field, e) => {
    setRegistrationData({ ...registrationData, [field]: e.target.value });
  };

  return (
    <Box sx={{ textAlign: "center", margin: "120px" }}>
      <Paper sx={{ padding: "15px" }}>
        <Typography paddingBottom="40px" variant="h1">
          KiloGram
        </Typography>
        <Grid
          container
          sx={{
            textAlign: "center",
          }}
        >
          <Grid xs={12} item>
            <TextField
              placeholder="Enter your username"
              onChange={(e) => handleFieldChange("username", e)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "10px", marginBottom: "20px" }}
        >
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your email"
              fullWidth
              onChange={(e) => handleFieldChange("email", e)}
              error={!validation}
              type="email"
              helperText={!validation && "Please enter valid email!"}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your phone"
              fullWidth
              onChange={(e) => handleFieldChange("phone", e)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your password"
              onChange={(e) => handleFieldChange("password", e)}
              fullWidth
              error={!isPasswordsValid}
              helperText={!isPasswordsValid && "Passwords don t match"}
              type="password"
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your password confirmation"
              onChange={(e) => handleFieldChange("confirmationPassword", e)}
              error={!isPasswordsValid}
              helperText={!isPasswordsValid && "Passwords dont match"}
              fullWidth
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          sx={{ padding: "8px 0" }}
          disabled={!isPasswordsValid || !validation}
          onClick={() => sendRegisteredData()}
          fullWidth
          variant="contained"
        >
          Sign up
        </Button>
      </Paper>
    </Box>
  );
};
