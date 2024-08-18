import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import './login.css';

const Login = () => {
    return (
        <Grid>
            <Grid align='center'>
                <Avatar className="logoStyle">
                    <LocationCityIcon className="iconStyle" />
                </Avatar>
                <h2>PerfectKode</h2>
            </Grid>

            <Paper elevation={12} className="paperStyle">
                <Grid align='center'>
                    <Avatar className="avatarStyle">
                        <LockOutlinedIcon className="iconLockStyle" />
                    </Avatar>
                    <h2>Login</h2>
                </Grid>
                <TextField id="standard-basic" label="Username" variant="standard" placeholder='Enter Your Username' fullWidth required />
                <TextField id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Password' type='password' fullWidth required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

                <Button className="btnStyle" type='submit' color='primary' variant="contained" fullWidth>Login</Button>
                <Typography>
                    <Link href="#">
                        Forgot Password?
                    </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}

export default Login;
