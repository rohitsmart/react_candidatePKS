import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './login.css';
import ENDPOINTS from '../assests/Endpoints';
import { setToken, setUserDetails } from '../redux/slices/authSlice';
import { LoaderContext, SnackbarContext } from '../App';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSnackbar = useContext(SnackbarContext);
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const handleLogin = async (e) => {
    showLoader();
    e.preventDefault();
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, { email, password });
      if (response.data.token) {
        dispatch(setToken(response.data.token));
        const userResponse = await axios.get(ENDPOINTS.USER_EMPLOYEE_DETAILS, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });
        dispatch(setUserDetails(userResponse.data));
        showSnackbar('Login successful! Redirecting to dashboard...', 'success');
        setTimeout(() => {
          hideLoader();
          navigate('/dashboard');
        }, 1000);
      } else {
        hideLoader();
        showSnackbar('Login failed. Invalid credentials.', 'error');
      }
    } catch (error) {
      hideLoader();
      console.error('Login failed:', error);
      showSnackbar('Login failed. Please try again.', 'error');
    }
  };
  
  return (
    <Grid>
      <Grid align="center">
        <Avatar className="logoStyle">
          <LocationCityIcon className="iconStyle" />
        </Avatar>
        <h2>PerfectKode</h2>
      </Grid>

      <Paper elevation={12} className="paperStyle">
        <Grid align="center">
          <Avatar className="avatarStyle">
            <LockOutlinedIcon className="iconLockStyle" />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="standard"
            placeholder="Enter Your Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </form>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember Me"
        />
        <Typography className="forgetpasswordLink">
          <Link href="#">Forgot Password?</Link>
        </Typography>
      </Paper>
    </Grid>
    //testing
  );
};

export default Login;
