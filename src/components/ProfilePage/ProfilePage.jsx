import {Box, Button, Dialog, DialogContent, Divider, Grid, Input, Paper, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {RemoveCircle} from "@mui/icons-material";

export const ProfilePage = ({user}) => {
    const [showCreateDialog,setShowCreateDialog] = useState(false)
    const [posts,setPosts] = useState([{}])
    const [newPost,setNewPost] = useState({
        title:'',
        description:'',
        picture:'',
    })

    const handleCloseDialog = useCallback(() => {
        setShowCreateDialog(prev => !prev)
    },[showCreateDialog])

    const { username, email, phone, _id } = user;

    const handleData = (field,value) => {
        setNewPost({ ...newPost, [field]:value });
    }

const submitNewPost = async () => {
    await axios.post(`http://localhost:8080/profile`,{
        title: newPost.title,
        description: newPost.description,
        picture: newPost.picture,
        userId: _id
    },{
        headers: {
            'Authorization':`Bearer ${sessionStorage.getItem("Token")}`
        }
    })
    handleCloseDialog()
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

    useEffect(  () => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8080/profile/${_id}/posts`,{
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem("Token")}`
                }
            })
            setPosts(response.data.posts)
        }
        fetchData()
            .catch(console.error);
    },[_id,showCreateDialog]);


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
          <Button onClick={handleCloseDialog} variant='contained' color='primary'>Create new post</Button>
          <Grid xs={12} container>
          {posts?.map((item,index)  => (
              <Grid xs={4} item sx={{padding:'5px', margin:'10px',border:'1px black solid'}}>
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
                    <TextField onChange={(e) => handleData('title', e.target.value)} placeholder='Title'/>
                    <TextField onChange={(e) => handleData('description', e.target.value)} placeholder='Description'/>
                    <Input onChange={(e) => handleData('picture',e.target.value)} type="file"/>
                    <Button onClick={submitNewPost}>Submit</Button>
                </Box>
            </DialogContent>
        </Dialog>
        }
        {showDeleteDialog && <Dialog>

        </Dialog>}
    </Grid>
  );
};
