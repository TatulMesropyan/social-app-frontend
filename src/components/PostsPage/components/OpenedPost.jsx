import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { Download, HeartBroken, Share } from '@mui/icons-material';
import { saveAs } from 'file-saver';

import { postDialog } from '../../../redux/actions/postsReducer';

export const OpenedPost = ({ postId }) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.postsState);
  const loginData = useSelector((state) => state?.loginState?.user);
  const { _id } = loginData || {};
  const { openedPost, openSingleDialog } = profileData || {};
  const { posts, title, description, picture } = openedPost || {};
  const downloadImage = () => saveAs(picture, `${title}.jpg`);
  const likePost = async () => {
    await axios.put(
      `http://localhost:8080/profile/${_id}/posts/${postId}/likes`,
      {},
      {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem('Token')}`
        }
      }
    );
  };
  return (
    <Dialog onClose={() => dispatch(postDialog())} open={openSingleDialog} maxWidth="500px">
      <DialogContent>
        <Grid container direction="row" spacing={5}>
          <Grid item xs={8}>
            <img width="400" alt={title} src={picture} />
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="column">
              <Grid item xs={2}>
                <Typography variant="h3">{title}</Typography>
              </Grid>
              <Grid item xs={4} borderTop={1}>
                <Typography variant="h6">{description}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row">
                  <Grid xs={4} item>
                    <Button onClick={likePost}>
                      <HeartBroken />
                    </Button>
                  </Grid>
                  <Grid xs={4} item>
                    <Button onClick={downloadImage}>
                      <Download />
                    </Button>
                  </Grid>
                  <Grid xs={4} item>
                    <Button>
                      <Share />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
