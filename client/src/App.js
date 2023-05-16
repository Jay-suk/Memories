//files imported -- posts.js and form.js from components , getPosts method from /actions/posts
import React ,{ useEffect } from "react";
//importing material-ui stuff for styling
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

//importing the Posts and Form component
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
//importing getPosts method
import { getPosts } from './actions/posts'

//image import
import memories from './images/memories.png';
import useStyles from './styles';


//layout of our app with material-ui styling
const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //dispatch(getPosts()) whenever there is a change in [dispatch](change in redux store)
  useEffect( () => {
    dispatch(getPosts());
  }, [dispatch]);
  
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container> 
  );
};

//exporting this component as default to index.js
export default App;
