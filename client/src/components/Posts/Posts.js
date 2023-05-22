//files imported -- post method form /post/post.js
//this component is for displaying all posts
import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post'
import useStyles from './styles';

//form App
const Posts= ({ setCurrentId }) => {
    //all the posts are selected from the state
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    //if posts array empty and not loading -- means no post to show
    if(!posts.length && !isLoading )
        return 'No posts';

    //looping through all the posts and rendering a grid component which contains the Post component ,,also passing the {post,setCurrentId} as prop
    return(
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;