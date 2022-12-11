import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  deletePostDialog,
  getOpenedPostData,
  postDialog,
  setError
} from '../../../redux/actions/postsReducer';

export const SinglePost = ({ userID, title, description, picture, postID }) => {
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    dispatch(deletePostDialog());
    const res = await axios.delete(`http://localhost:8080/profile/${postID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('Token')}`
      }
    });
  };

  const getExactPost = async (openedPostId) => {
    try {
      const res = await axios.get(`http://localhost:8080/profile/${userID}/posts/${openedPostId}`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('Token')}`
        }
      });
      dispatch(getOpenedPostData(res.data.post));
    } catch (err) {
      dispatch(setError(err));
    }
  };
  return (
    <Grid
      container
      direction="column"
      sx={{ border: '3px #01FF70 ridge', borderRadius: '25px' }}
      onClick={() => getExactPost(postID)}
    >
      <Grid item xs={2} borderBottom={1}>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid item xs={4}>
        <img alt={title} width="180px" height="200px" src={picture} />
      </Grid>
      <Grid item x={2} borderTop={1}>
        <Typography variant="h6">{description}</Typography>
      </Grid>
    </Grid>
  );
};
