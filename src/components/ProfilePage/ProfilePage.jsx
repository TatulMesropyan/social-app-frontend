import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export const ProfilePage = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await axios.get("http://localhost:8080/registration");
    setData(response.data);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Paper>
        <Typography paddingBottom="40px" variant="h1">
          Profile
        </Typography>
        {data?.map((itm) => (
          <Box
            sx={{
              display: "flex",
              direction: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Name: {itm.username}</Typography>
              <Divider />
            </Box>
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Email: {itm.email}</Typography>
              <Divider orientation="horizontal" />
            </Box>
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Phone: {itm.phone}</Typography>
              <Divider orientation="horizontal" />
            </Box>
          </Box>
        ))}
        <Button
          variant="contained"
          color="success"
          onClick={() => getData()}
          fullWidth
        >
          Get Data
        </Button>
      </Paper>
    </Box>
  );
};
