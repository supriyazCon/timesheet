import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../Redux/login';
import { ROUTES } from '../../Routes/Paths';
// Other imports...

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state?.auth?.error);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    try {
      const payload = {
        username: formData.username, // Use the user-provided username
        password: formData.password, // Use the user-provided password
      }

      const response = await fetch('http://10.235.3.8:8021/api/auth/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.status === 200) {
        // Successful login
        dispatch(loginSuccess(resData));
        navigate(ROUTES.DASHBOARD); // Navigate to the Dashboard page

      } else {
        // Failed login
        // dispatch(loginFailure('Invalid username or password.'));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          {authError && (
            <Typography sx={{ color: 'error.main', mt: 1 }} align="center">
              {authError}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
