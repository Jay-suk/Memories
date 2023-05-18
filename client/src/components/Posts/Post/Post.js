//this component is for individual post
import React from 'react';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

//from Posts
const Post= ({ post, setCurrentId }) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        <Card className={classes.card}>
            
            {/*  image */}
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

            {/* time */}
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.creator} </Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
            </div>

            {/* edit button */}
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" 
                    onClick={() => setCurrentId(post._id)} 
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>

            {/*tags*/}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            {/* title */}
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography>

            {/* message */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

            {/* like and delete */}
            <CardActions className={classes.cardActions}>

                {/* like */}
                <Button size="small" color="primary" 
                    onClick={() => dispatch(likePost(post._id))}
                >
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>

                {/* delete */}
                <Button size="small" color="primary" 
                    onClick={() => dispatch(deletePost(post._id)) }
                >
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;