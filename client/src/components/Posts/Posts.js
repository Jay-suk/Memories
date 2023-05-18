//files imported -- post method form /post/post.js
//this component is for displaying all posts
import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post'

import useStyles from './styles';

//form App
const Posts= ({ setCurrentId }) => {
    //storing all the posts state
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    /*if posts is empty -- render a circular icon
    if not then we are iterating thorugh the posts array -- post
    and adding Post(singular) in a grid format and passing the post as prop
     */
    return(
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;