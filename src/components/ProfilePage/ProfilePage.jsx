import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RemoveCircle } from "@mui/icons-material";

import {
  deletePostDialog,
  getPosts,
  setError,
  setNewPost,
  setNewPostDialog,
} from "../../redux/actions/profile";
import { NewPostDialog } from "../ProfilePage/components/NewPostDialog";
import { DeletePostDialog } from "../ProfilePage/components/DeletePostDialog";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileState);
  const loginData = useSelector((state) => state?.loginState?.user);
  const {
    posts,
    title,
    description,
    picture,
    showCreateDialog,
    showSubmitDeleteDialog,
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
          userId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
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
    dispatch(setNewPost("picture", base64));
  };

  const handleDeletePost = useCallback(
    async (postId) => {
      dispatch(deletePostDialog());
      if (confirmDelete === 1) {
        await axios.delete(`http://localhost:8080/profile/${postId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
          },
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
        const res = await axios.get(
          `http://localhost:8080/profile/${_id}/posts`,
          {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("Token")}`,
            },
          }
        );
        dispatch(getPosts(res.data.posts));
      } catch (err) {
        dispatch(setError(err));
      }
    };
    fetchData();
  }, [_id, dispatch, showCreateDialog, showSubmitDeleteDialog]);

  return (
    <Grid sx={{ textAlign: "center" }}>
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
            <Typography variant="h6">Username: {username}</Typography>
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
          onClick={handleNewPostDialog}
          variant="contained"
          color="primary"
        >
          Create new post
        </Button>
        <Grid xs={12} container>
          {posts?.length > 0 &&
            posts?.map((item, index) => (
              <Grid
                xs={3}
                item
                sx={{
                  padding: "5px",
                  margin: "10px",
                  border: "1px black solid",
                }}
                key={index}
              >
                <h5>{item.title}</h5>
                <h6>{item.description}</h6>
                <img alt="" width="150px" src={item.picture} />
                <Button
                  onClick={() => handleDeletePost(item["_id"])}
                  variant="contained"
                >
                  Delete post <RemoveCircle />
                </Button>
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
