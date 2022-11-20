import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getLoginCredentials, setError, setLoginResponse} from '../../redux/actions/login';

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(state => state.loginState)

  const handleSendData = async () => {
      try {
      const response = await axios.post("http://localhost:8080/login",{
          username:data.login,
          password:data.password,
      })
          dispatch(setLoginResponse(response.data.token,response.data.user));
          navigate('/profile')
      }
      catch (e) {
        dispatch(setError(e.data))
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
                dispatch(getLoginCredentials('login',e.target.value ))
            }
          />
          <TextField
            fullWidth
            placeholder="Password"
            type="password"
            onChange={(e) =>
                dispatch(getLoginCredentials('password',e.target.value ))
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
