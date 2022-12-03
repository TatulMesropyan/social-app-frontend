import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RemoveCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import {
  deletePostDialog,
  getPosts,
  setError,
  setNewPost,
  setNewPostDialog,
  confirmPostDelete
} from '../../redux/actions/profile';
import { NewPostDialog } from '../ProfilePage/components/NewPostDialog';
import { DeletePostDialog } from '../ProfilePage/components/DeletePostDialog';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profileState);
  const loginData = useSelector((state) => state?.loginState?.user);
  const {
    posts,
    title,
    description,
    picture,
    showCreateDialog,
    showSubmitDeleteDialog,
    confirmPostDelete
  } = profileData || {};
  const { _id, username, phone, email } = loginData || {};
  const [confirmDelete, setConfirmDelete] = useState(0);

  const handleNewPostDialog = useCallback(() => {
    dispatch(setNewPostDialog());
  }, [dispatch]);

  const submitNewPost = async () => {
    try {
      await axios.post(
        `http://localhost:8080/profile`,
        {
          title: title,
          description: description,
          picture: picture,
          userId: _id
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`
          }
        }
      );
    } catch (err) {
      dispatch(setError(err));
    }
    handleNewPostDialog();
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    dispatch(setNewPost('picture', base64));
  };

  const handleDeletePost = useCallback(
    async (postId) => {
      dispatch(deletePostDialog());
      if (confirmDelete === 1) {
        await axios.delete(`http://localhost:8080/profile/${postId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`
          }
        });
        dispatch(deletePostDialog());
      }
      if (confirmDelete === 2) {
        return dispatch(deletePostDialog());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/profile/${_id}/posts`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('Token')}`
          }
        });
        dispatch(getPosts(res.data.posts));
      } catch (err) {
        dispatch(setError(err));
      }
    };
    fetchData();
  }, [_id, dispatch, showCreateDialog, showSubmitDeleteDialog]);

  return (
    <Grid sx={{ textAlign: 'center' }}>
      <Paper>
        <Typography paddingBottom="40px" variant="h1">
          Profile
        </Typography>
        <Box
          sx={{
            display: 'flex',
            direction: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', direction: 'row' }}>
            <Typography variant="h6">Username: {username}</Typography>
            <Divider />
          </Box>
          <Box sx={{ display: 'flex', direction: 'row' }}>
            <Typography variant="h6">Email: {email}</Typography>
            <Divider orientation="horizontal" />
          </Box>
          <Box sx={{ display: 'flex', direction: 'row' }}>
            <Typography variant="h6">Phone: {phone}</Typography>
            <Divider orientation="horizontal" />
          </Box>
        </Box>
        <Button onClick={handleNewPostDialog} variant="contained" color="primary">
          Create new post
        </Button>
        <Button
          onClick={() => navigate('/profile/change-password')}
          variant="contained"
          color="primary"
        >
          Change Password
        </Button>
        <Button
          onClick={() => navigate('/profile/change-email')}
          variant="contained"
          color="primary"
        >
          Change Email
        </Button>
        <Grid xs={12} container>
          {posts?.length > 0 &&
            posts?.map((item, index) => (
              <Grid xs={4} item key={index}>
                <Grid container xs={12} direction="column" alignItems="center" sx={{}}>
                  <Grid item xs={3}>
                    <h5>{item.title}</h5>
                  </Grid>
                  <Grid item xs={3}>
                    <h6>{item.description}</h6>
                  </Grid>
                  <Grid item xs={3}>
                    <img alt="" width="150px" src={item.picture} />
                  </Grid>
                  <Grid item xs={3}>
                    <Button onClick={() => handleDeletePost(item['_id'])} variant="contained">
                      Delete post <RemoveCircle />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Paper>
      {showCreateDialog && (
        <NewPostDialog
          handleNewPostDialog={handleNewPostDialog}
          showCreateDialog={showCreateDialog}
          submitNewPost={submitNewPost}
          handleFileUpload={handleFileUpload}
        />
      )}
      {showSubmitDeleteDialog && (
        <DeletePostDialog
          setConfirmDelete={setConfirmDelete}
          showSubmitDeleteDialog={showSubmitDeleteDialog}
        />
      )}
    </Grid>
  );
};
