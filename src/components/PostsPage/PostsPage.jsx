import { Button, Grid, Paper } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/* eslint-disable no-unused-vars */
import {
  deletePostDialog,
  getPosts,
  setError,
  setNewPost,
  setNewPostDialog,
  confirmPostDelete
} from '../../redux/actions/postsReducer';
import { NewPostDialog } from './components/NewPostDialog';
import { DeletePostDialog } from './components/DeletePostDialog';
import { SinglePost } from './components/SinglePost';
import { OpenedPost } from './components/OpenedPost';

export const PostsPage = () => {
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
    openSingleDialog
  } = profileData || {};
  const { _id } = loginData || {};
  const [confirmDelete, setConfirmDelete] = useState(0);
  const [openedPostId, setOpenedPostId] = useState(null);

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

  const getExactPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8080//profile/${_id}/posts/${openedPostId}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('Token')}`
        }
      });
    } catch (err) {
      dispatch(setError(err));
    }
  };
  return (
    <>
      <Button onClick={handleNewPostDialog} fullWidth variant="contained" color="success">
        Create new post
      </Button>
      <Paper sx={{ textAlign: 'center', marginTop: '10px' }}>
        <Grid spacing={5} container>
          {posts?.map((item, index) => (
            <Grid xs={4} item key={index} spacing={2}>
              <SinglePost
                userID={_id}
                title={item.title}
                description={item.description}
                picture={item.picture}
                postID={item['_id']}
                setOpenedPostId={setOpenedPostId}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
      {openSingleDialog && <OpenedPost />}
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
    </>
  );
};
