import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./login.css";
import ENDPOINTS from "../assests/Endpoints";
import { setToken } from "../redux/slices/authSlice";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      console.log("Token in Redux after dispatch:", token);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(ENDPOINTS.LOGIN, { email, password });

      if (response.data.token) {
        dispatch(setToken(response.data.token));
        console.log("Token set in Redux:", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Login failed:', error);
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
          <div>
            <TextField
              className="LoginEmailInput"
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
          </div>
          <Button
            className="btnStyle"
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </form>
        <div className="loginFooter">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
          />
          <Typography className="forgetpasswordLink">
            <Link href="#">Forgot Password?</Link>
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default Login;
