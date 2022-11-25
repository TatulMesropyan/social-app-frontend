import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setFields } from '../../redux/actions/changePassword';

export const ChangePassword = () => {
  const dispatch = useDispatch();
  return (
    <>
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
    </>
  );
};
