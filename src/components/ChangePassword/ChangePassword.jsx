import axios from 'axios';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setError, setFields, setResponse } from '../../redux/actions/changePassword';

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginData = useSelector((state) => state?.loginState?.user);
  const { _id } = loginData || {};
  const data = useSelector((state) => state.changePasswordState);
  const { currentPassword, newPassword, confirmationPassword } = data || {};
  const handleSendData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/profile/${_id}/change-password`,
        {
          currentPassword,
          newPassword,
          confirmationPassword
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('Token')}`
          }
        }
      );
      setResponse(response.data.status);
      navigate('/login');
    } catch (e) {
      dispatch(setError(e.data));
    }
  };
  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          padding: '100px'
        }}
      >
        <Typography varitant="h3">Change Password</Typography>
        <TextField
          onChange={(e) => dispatch(setFields('currentPassword', e.target.value))}
          label="Current Password"
        />
        <TextField
          onChange={(e) => dispatch(setFields('newPassword', e.target.value))}
          label="New Password"
        />
        <TextField
          onChange={(e) => dispatch(setFields('confirmationPassword', e.target.value))}
          label="Confirmation Password"
        />
        <Button onClick={handleSendData} variant="contained" color="warning">
          Change
        </Button>
      </Box>
    </Paper>
  );
};
