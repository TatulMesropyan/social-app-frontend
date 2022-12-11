import React from 'react';
import { Box, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postDialog } from '../../../redux/actions/postsReducer';
import { Download, HeartBroken, Settings, Share } from '@mui/icons-material';

export const OpenedPost = ({}) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileState);
  const { openedPost, openSingleDialog } = profileData || {};
  const { posts, title, description, picture } = openedPost || {};
  return (
    <Dialog onClose={() => dispatch(postDialog())} open={openSingleDialog} maxWidth="500px">
      <DialogContent>
        <Grid container direction="row">
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
                <Button>
                  <HeartBroken />
                </Button>
                <Button>
                  <Download />
                </Button>
                <Button>
                  <Share />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
