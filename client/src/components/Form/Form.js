//files imported -- createPost method from action/posts.js
//form component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) =>{
    //initializing and managing the state object postData using useState
    //setPostData -- to change the state--form(default values)
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    
<<<<<<< HEAD
    //storing the specific post which has the same id as current id
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null);

    const classes = useStyles();
    const dispatch = useDispatch();

    //populating the form,, whenever post has a value (notNull)
=======
    //finding the particular post state with id same as current id from all the posts in the state -- default value is null
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null);

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    //whenever the selected post state changes,,, setPostData is called and populates the form field with the value relative to curentId
>>>>>>> jwt-imp
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    //when we click the submit button to create a new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //if id exists (not null) update else create
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    };
    
    //to clear the response in the create post form
    const clear =() => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };

    //if the user is logged in ,,he can't fill the form to create a post-- so render this component
    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper} >
                <Typography variant="h6" align="center" >
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    } 

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}> 
            <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                 <TextField
                 name="title" 
                 variant="outlined" 
                 label="Title" 
                 fullWidth 
                 value={postData.title}
                 onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                 />
                 <TextField
                 name="message" 
                 variant="outlined" 
                 label="Message" 
                 fullWidth 
                 multiline
                 minRows={4}
                 value={postData.message}
                 onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                 />
                 <TextField
                 name="tags" 
                 variant="outlined" 
                 label="Tags" 
                 fullWidth 
                 value={postData.tags}
                 onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                 />
                 <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 }) }
                    />
                 </div>

                 <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                 <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;
