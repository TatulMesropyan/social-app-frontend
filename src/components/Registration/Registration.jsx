import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegistrationCredentials } from "../../redux/actions/registration";

export const Registration = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.registrationState);
  const { username, phone, password, confirmationPassword, email } = data || {};
  const [validation, setValidation] = useState(false);
  const [isPasswordsValid, setIsPasswordsValid] = useState(false);
  const navigate = useNavigate();

  const sendRegisteredData = async () => {
    try {
      await axios.post("http://localhost:8080/registration", {
        username: username,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmationPassword,
      });
      navigate("/login");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  useEffect(() => {
    if (password === confirmationPassword && password.length > 1) {
      setIsPasswordsValid(true);
    } else setIsPasswordsValid(false);

    if (email.includes("@") && email.length > 1) {
      setValidation(true);
    } else setValidation(false);
  }, [password, confirmationPassword, email]);

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
              onChange={(e) =>
                dispatch(setRegistrationCredentials("username", e.target.value))
              }
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
              onChange={(e) =>
                dispatch(setRegistrationCredentials("email", e.target.value))
              }
              error={!validation}
              type="email"
              helperText={!validation && "Please enter valid email!"}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your phone"
              fullWidth
              onChange={(e) =>
                dispatch(setRegistrationCredentials("phone", e.target.value))
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your password"
              onChange={(e) =>
                dispatch(setRegistrationCredentials("password", e.target.value))
              }
              fullWidth
              error={!isPasswordsValid}
              helperText={!isPasswordsValid && "Passwords don t match"}
              type="password"
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your password confirmation"
              onChange={(e) =>
                dispatch(
                  setRegistrationCredentials(
                    "confirmationPassword",
                    e.target.value
                  )
                )
              }
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
