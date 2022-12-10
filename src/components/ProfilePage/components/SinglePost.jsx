import { Box, Button } from '@mui/material';
import { deletePostDialog } from '../../../redux/actions/profile';
// import { deletePostDialog } from '../ProfilePage/components/DeletePostDialog';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RemoveCircle } from '@mui/icons-material';

export const SinglePost = ({ title, description, picture, postID }) => {
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    dispatch(deletePostDialog());
    await axios.delete(`http://localhost:8080/profile/${postID}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('Token')}`
      }
    });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '250px',
        height: '250px',
        textAlign: 'center'
      }}
    >
      <h4>{title}</h4>
      {description}
      <img alt={title} width="180px" height="200px" src={picture} />
      <Button onClick={handleDeletePost} variant="contained">
        Delete post <RemoveCircle />
      </Button>
    </Box>
  );
};
