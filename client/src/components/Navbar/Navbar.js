import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography, Box } from '@material-ui/core';
import decode from 'jwt-decode';

import useStyles from './styles';
import { LOGOUT } from '../../constants/actionTypes';
import memories from '../../images/memories.png';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: LOGOUT});
        navigate('/auth');
        setUser(null);
    };

    //console.log(user);

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser((JSON.parse(localStorage.getItem('profile'))));
    },[location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
         {/*   <Link to="/" className={classes.brandContainer}>
                <Box>
                    <Typography className={classes.heading} alt="icon" height="45px" align="center">Memories</Typography>
                </Box>
                <img className={classes.image} src={memories} alt="logo" height="40px" />
    </Link>*/}
            <div className={classes.brandContainer}>
                {/* memories */}
                <Typography 
                    component={Link} 
                    to="/" 
                    className={classes.heading} 
                    variant="h2" 
                    align="center"
                >
                    Memories
                </Typography>

                {/* logo */}
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>

            {/* if a user is logged in render avatar, user Name and logout button ,, else render signIn button */}
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user?.result?.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;