import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post= ({ post, setCurrentId }) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ likes, setLikes ] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result?.sub || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if(hasLikedPost) {
            setLikes(likes.filter((id) => id !== userId ));
        } else {
            setLikes( [...post.likes, userId] );
        }
    };

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    //grammar part of likes is handled here -- depends on whether the user has liked the post or not
    const Likes = () => {
        if (likes?.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    
    //the post structure
    return(
        <Card className={classes.card} raised elevation={6}>

            <ButtonBase 
                component="span" 
                name="test" 
                className={classes.cardAction} 
                onClick={openPost}
            >
                {/* image */}
                <CardMedia 
                    className={classes.media} 
                    image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                    title={post.title} 
                />

                {/* name and created at */}
                <div className={classes.overlay}>
                    <Typography variant="h6"> {post.name} </Typography>
                    <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
                </div>
            </ButtonBase>
            {/* edit button -- render only if the user and post creator are same */}
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (  
                <div className={classes.overlay2} name="edit">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id);
                        }}
                        style={{ color: 'white' }}
                        size="small"
                    >
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
            )}

            {/* tags */}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary" >
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            {/* post Title */}
            <Typography className={classes.title} variant="h5"  gutterBottom>
                {post.title}
            </Typography>

            {/* message */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message.split(' ').splice(0, 20).join(' ')}...
                </Typography>
            </CardContent>
           
            

            <CardActions className={classes.cardActions}>
                {/* like button -- only logged in users can like -- enabled only for them */}
                <Button size="small" color="primary" disabled={!user?.result}
                    onClick={handleLike}
                >
                    <Likes />
                </Button>

                {/* delete button -- rendered only for the post owner */}
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (  
                    <Button size="small" color="secondary" 
                        onClick={() => dispatch(deletePost(post._id)) }
                    >
                        <DeleteIcon fontSize="small"/>
                        &nbsp;Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;