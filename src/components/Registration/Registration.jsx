import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

export const Registration = ({
  getData,
  registrationData,
  setRegistrationData,
  sendPostRequest,
}) => {
  return (
    <Box sx={{ textAlign: "center", margin: "120px" }}>
      <Paper>
        <Typography paddingBottom="40px" variant="h1">
          KiloGram
        </Typography>
        <Grid
          container
          sx={{
            paddingRight: "175px",
            paddingLeft: "160px",
            textAlign: "center",
          }}
        >
          <Grid xs={12} item>
            <TextField
              placeholder="Enter your username"
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  username: e.target.value,
                })
              }
              fullWidth
              value={registrationData.username}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: "15px 160px" }}>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your email"
              fullWidth
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  email: e.target.value,
                })
              }
              value={registrationData.email}
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your phone"
              fullWidth
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  phone: e.target.value,
                })
              }
              value={registrationData.phone}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ padding: "15px 160px" }}>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your password"
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  password: e.target.value,
                })
              }
              value={registrationData.password}
              fullWidth
            />
          </Grid>
          <Grid xs={6} item>
            <TextField
              placeholder="Enter your password confirmation"
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  confirmPassword: e.target.value,
                })
              }
              value={registrationData.confirmPassword}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            paddingRight: "175px",
            paddingLeft: "160px",
            paddingBottom: "30px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => sendPostRequest()}
            fullWidth
          >
            Confirm
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
