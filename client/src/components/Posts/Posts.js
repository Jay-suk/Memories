//files imported -- post method form /post/post.js
//this component is for displaying all posts
import React from 'react';

import { useSelector } from 'react-redux';
import Post from './Post/Post'

import useStyles from './styles';

const Posts= () =>{
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log(posts);
    return(
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;