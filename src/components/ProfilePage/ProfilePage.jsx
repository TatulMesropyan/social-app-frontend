import { Box, Button, Divider, Paper, Typography } from "@mui/material";

export const ProfilePage = ({ data, getData }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Paper>
        <Typography paddingBottom="40px" variant="h1">
          Profile
        </Typography>
        {data.map((itm) => (
          <Box
            sx={{
              display: "flex",
              direction: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Name: {itm.username}</Typography>
              <Divider dark />
            </Box>
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Email: {itm.email}</Typography>
              <Divider orientation="horizontal" color="black" />
            </Box>
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Phone: {itm.phone}</Typography>
              <Divider orientation="horizontal" color="black" />
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          color="error"
          onClick={() => getData()}
          fullWidth
        >
          Get Data
        </Button>
      </Paper>
    </Box>
  );
};
