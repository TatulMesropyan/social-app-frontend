import {Box, Button, Dialog, DialogContent, Divider, Grid, Input, Paper, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {RemoveCircle} from "@mui/icons-material";

import {getPosts, setError, setNewPost} from "../../redux/actions/profile";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const profileData = useSelector(state => state.profileState)
    const {posts,title,description,picture} = profileData?.posts || {};
    const loginData = useSelector(state => state?.loginState?.user)
    const {_id,username,phone,email} = loginData || {};

    const [showCreateDialog,setShowCreateDialog] = useState(false)

    const handleCloseDialog = useCallback(() => {
        setShowCreateDialog(prev => !prev)
    },[showCreateDialog])


const submitNewPost = async () => {
        try {
    await axios.post(`http://localhost:8080/profile`,{
        title: title,
        description:description,
        picture: picture,
        userId: _id
    },{
        headers: {
            'Authorization':`Bearer ${sessionStorage.getItem("Token")}`
        }
    })
        }
        catch (err) {
            dispatch(setError(err))
        }
};



    const handleDeletePost =  useCallback(
        async (postId) => {
            await axios.delete(`http://localhost:8080/profile/${postId}`,{
                headers: {
                'Authorization':`Bearer ${sessionStorage.getItem("Token")}`
                },
            }
           )
        },
        [posts],
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/profile/${_id}/posts`, {
                    headers: {
                        'authorization': `Bearer ${sessionStorage.getItem("Token")}`
                    }
                })
                dispatch(getPosts(res.data.posts));
            } catch (err) {
                dispatch(setError(err))
            }
        }
        fetchData();
    },[_id, dispatch]);

    return (
    <Grid  sx={{ textAlign: "center" }}>
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
          <Button onClick={handleCloseDialog} variant='contained' color='primary'>Create new post</Button>
          <Grid xs={12} container>
          {posts.length > 0 && posts?.map((item,index)  => (
              <Grid xs={4} item sx={{padding:'5px', margin:'10px',border:'1px black solid'}} key={index}>
                  <h5>{item.title}</h5>
                  <h6>{item.description}</h6>
                  <img alt='' width='150px' src={item.picture}/>
                  <Button onClick={() => handleDeletePost(item['_id'])} variant='contained'>Delete post <RemoveCircle/></Button>
              </Grid>
          ))}
          </Grid>
      </Paper>
        {showCreateDialog &&
        <Dialog onClose={handleCloseDialog} open={showCreateDialog}>
             <DialogContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    justifyContent: "flex-start",
                }}>
                    <TextField onChange={(e) => dispatch(setNewPost('title', e.target.value))} placeholder='Title'/>
                    <TextField onChange={(e) => dispatch(setNewPost('description', e.target.value))} placeholder='Description'/>
                    <Input onChange={(e) => dispatch(setNewPost('picture',e.target.value))} type="file"/>
                    <Button onClick={submitNewPost}>Submit</Button>
                </Box>
            </DialogContent>
        </Dialog>
        }
    </Grid>
  );
};
