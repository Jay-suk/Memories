//this component is for individual post
import React from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

//from Posts
const Post= ({ post, setCurrentId }) =>{
    const classes = useStyles();
    const dispatch = useDispatch();

<<<<<<< HEAD
    return(
        <Card className={classes.card}>
            
            {/*  image */}
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />

            {/* time */}
=======
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.sub || user?.result?._id;

    //grammar part of likes is handled here -- depends on whether the user has liked the post or not
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    
    //the post structure
    return(
        <Card className={classes.card}>
            {/* image */}
            <CardMedia 
                className={classes.media} 
                image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                title={post.title} 
            />

            {/* name and created at */}
>>>>>>> jwt-imp
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.name} </Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
            </div>

<<<<<<< HEAD
            {/* edit button */}
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" 
                    onClick={() => setCurrentId(post._id)} 
                >
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>

            {/*tags*/}
=======
            {/* edit button -- render only if the user and post creator are same */}
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (  
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}} 
                        size="small" 
                        onClick={() => setCurrentId(post._id)} 
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}

            {/* tags */}
>>>>>>> jwt-imp
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

<<<<<<< HEAD
            {/* title */}
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography>
=======
            {/* post Title */}
            <Typography className={classes.title} variant="h5" component="h2" gutterBottom>
                {post.title}
            </Typography>
>>>>>>> jwt-imp

            {/* message */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>

<<<<<<< HEAD
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
=======
            <CardActions className={classes.cardActions}>
                {/* like button -- only logged in users can like -- enabled only for them */}
                <Button size="small" color="primary" disabled={!user?.result}
                    onClick={() => dispatch(likePost(post._id))}
                >
                    <Likes />
>>>>>>> jwt-imp
                </Button>

                {/* delete button -- rendered only for the post owner */}
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (  
                    <Button size="small" color="secondary" 
                        onClick={() => dispatch(deletePost(post._id)) }
                    >
                        <DeleteIcon fontSize="small"/>
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;