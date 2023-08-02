import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ReusableSnackbar({ open, message, severity, handleClose, autoHideDuration = 2000 }) {
  const anchorOrigin = { vertical: 'top', horizontal: 'right' };

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose} anchorOrigin={anchorOrigin}>
      <MuiAlert onClose={handleClose} severity={severity} variant='filled' sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default ReusableSnackbar;
