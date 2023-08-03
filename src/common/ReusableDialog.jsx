import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';

function ReusableDialog({ open, onConfirm, onCancel, message, }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-confirmation-dialog-title"
    >
      {/* <DialogTitle id="delete-confirmation-dialog-title"> Confirmation</DialogTitle> */}
      <br />
      <DialogContent sx={{fontFamily:'inherit'}}>
        <div>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReusableDialog;
