import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../Redux/login';
import { ROUTES } from '../../Routes/Paths';
import zohoImage from '../../Assets/images/zoho-logo.png'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [componentMounted, setComponentMounted] = useState(false);
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

    if (formData.username === '' || formData.password === '') {
      setUsernameError('Please enter username and password');
      // setPasswordError('Please enter a password');
      return;
    }

    if (formData.password === '') {
      // setPasswordError('Please enter a password');
      return;
    }
    setComponentMounted(!componentMounted);
    dispatch(loginSuccess(formData))
  };
  // useEffect(() => {
  //   console.log("Testing")
  //   setComponentMounted(!componentMounted);
  // }, []);
  useEffect(() => {

    if (loginError !== null && !isloggedIn && !componentMounted) {
      toast.error("Incorrect username and password");
    } else if (loginError === null && isloggedIn) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [loginError, isloggedIn, componentMounted, navigate]);
  return (
    <Container component="main" maxWidth="xs">

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <img src={zohoImage} alt="Zoho Logo" style={{ width: '50%', marginTop: '-30%' }} />
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>
        <Typography variant="h4" gutterBottom>
          to access People
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
            error={!!usernameError || !!passwordError}
            // helperText={usernameError || passwordError}
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
            error={!!passwordError || !!usernameError}
            helperText={passwordError || usernameError}
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
