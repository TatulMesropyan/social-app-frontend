import React from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { deletePostDialog } from "../../../redux/actions/profile";

export const DeletePostDialog = ({
  setConfirmDelete,
  showSubmitDeleteDialog,
}) => {
  const dispatch = useDispatch();
  return (
    <Dialog
      onClose={() => dispatch(deletePostDialog())}
      open={showSubmitDeleteDialog}
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            justifyContent: "flex-start",
          }}
        >
          <Typography textAlign="center">
            Are you sure you want ot delete post?
          </Typography>
          <Button onClick={() => setConfirmDelete(1)}>Delete</Button>
          <Button onClick={() => setConfirmDelete(2)}>Cancel</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
