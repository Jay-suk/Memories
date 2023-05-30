import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

import useStyles from './styles';
import Input from './input';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    //toggles the showPassword icon
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

    //performs manual signIn or signUp operation when the button is clicked depending on the value of isSignUp
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData,navigate));
        } else {
            dispatch(signin(formData,navigate));
        }
    };

    //changes in any field of the form is handled here by updating the state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    };

    //handle signIn signUp switch
    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevIsSignUp) => !prevIsSignUp );
        setShowPassword(false);
    };

    //when Google login is succesful - dedode the credential and extract the token from it
    //dispatch the AUTH and navigate to the home page
    const googleSuccess = async (res) => {
        
        const result = jwtDecode(res?.credential);
        const token = res.credential;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    //on login failure
    const googleFailure = () => {
        alert("Google Sign In was unsuccessful");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={6} > 

                {/* lock icon */}
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>

                {/* signUup/signIn */}
                <Typography component="h1" variant="h5">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Typography>

                {/* render the signUP or signIn form depending on the isSignUp value */}
                {/* firstName, lastName and confirm password are only required if we are signing up */}
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2} >
                        {
                            isSignup && (
                                <>
                                    <Input 
                                        name="firstName"
                                        label="First Name" 
                                        handleChange={handleChange} 
                                        autoFocus half 
                                    />
                                    <Input 
                                        name="lastName" 
                                        label="Last Name" 
                                        handleChange={handleChange} 
                                        half 
                                    />
                                </>
                            )
                        }
                        <Input 
                            name="email" 
                            label="Email Address" 
                            handleChange={handleChange} 
                            type="email" 
                        />
                        <Input 
                            name="password" 
                            label="PassWord" 
                            handleChange={handleChange} 
                            type={ showPassword ? "text" : "password" } 
                            handleShowPassword={handleShowPassword} 
                        />
                        { isSignup && 
                            <Input 
                                name="confirmPassword" 
                                label="Repeat Password"    
                                handleChange={handleChange} 
                                type="password" 
                            /> 
                        }
                    </Grid>

                    {/* submit button */}
                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        className={classes.submit} 
                    >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    
                    {/* google login button */}
                    <Grid container justifyContent="center">
                        <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        width="100%"
                        />
                    </Grid>
                    
                    {/* signIn signUp switch */}
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button onClick={switchMode} >
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;