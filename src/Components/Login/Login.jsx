import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../Redux/login';
import { ROUTES } from '../../Routes/Paths';
// Other imports...

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [usernamePasswordError, setUsernamePasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const loginError = useSelector((state) => state.loginSuccess.error)
  const isloggedIn = useSelector((state) => state.loginSuccess.isloggedIn)


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUsernameError('');
    setPasswordError('');

    if (formData.username === '') {
      setUsernameError('Please enter a username');
      return;
    }

    if (formData.password === '') {
      setPasswordError('Please enter a password');
      return;
    }


    // if (formData.password === '' || formData.username === '') {
    //   setUsernamePasswordError('Please enter username and password');
    //   return;
    // }


    dispatch(loginSuccess(formData))
    alert("login error", loginError)
  };
  useEffect(() => {
    if (loginError === null && isloggedIn === true) {
      navigate(ROUTES.DASHBOARD)
    }
  }, [loginError, isloggedIn])
  return (
    <Container component="main" maxWidth="xs">
      {/* <ReusableSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={addClientData == null && editClientData === null ? 'error' : 'success'}
        handleClose={handleSnackbarClose}
      /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign in  to access Home
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            mt: 3,
          }}
        >
          <TextField
            label="Username"
            name='username'
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={!!usernameError}
            helperText={usernameError}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            name='password'
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!passwordError}
            helperText={passwordError}
            margin="normal"
            variant="outlined"
          />
          {/* {authErrorMessage && (
            <Typography sx={{ color: 'error.main', mt: 1 }} align="center">
              {authErrorMessage}
            </Typography>
          )} */}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
