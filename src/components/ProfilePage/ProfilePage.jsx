import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import {useParams} from "react-router-dom";

export const ProfilePage = ({user}) => {
    const {username,email,phone,_id} = user;
    
      return (
    <Box sx={{ textAlign: "center" }}>
      <Paper>
        <Typography paddingBottom="40px" variant="h1">
          Profile
        </Typography>
          <Box
            sx={{
              display: "flex",
              direction: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", direction: "row" }}>
              <Typography variant="h6">Name: {username}</Typography>
              <Divider />
            </Box>
            <Box sx={{ display: "flex", direction: "row" }}>
                <Typography variant="h6">Email: {email}</Typography>
              <Divider orientation="horizontal" />
            </Box>
            <Box sx={{ display: "flex", direction: "row" }}>
                <Typography variant="h6">Phone: {phone}</Typography>
              <Divider orientation="horizontal" />
            </Box>
          </Box>
        <Button
          variant="contained"
          color="success"
          fullWidth
        >
          Get Data
        </Button>
      </Paper>
    </Box>
  );
};
