import React from 'react';
import { Box, Button, Dialog, DialogContent, Input, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { setNewPost } from '../../../redux/actions/postsReducer';

export const NewPostDialog = ({
  handleNewPostDialog,
  showCreateDialog,
  submitNewPost,
  handleFileUpload
}) => {
  const dispatch = useDispatch();
  return (
    <Dialog onClose={handleNewPostDialog} open={showCreateDialog}>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            justifyContent: 'flex-start'
          }}
        >
          <Typography textAlign="center">Create new Post</Typography>
          <TextField
            onChange={(e) => dispatch(setNewPost('title', e.target.value))}
            placeholder="Title"
          />
          <TextField
            onChange={(e) => dispatch(setNewPost('description', e.target.value))}
            placeholder="Description"
          />
          <Input onChange={handleFileUpload} type="file" accept=".jpeg, .png, .jpg" />
          <Button onClick={submitNewPost}>Submit</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
