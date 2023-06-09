//files imported -- createPost method from action/posts.js
//form component
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) =>{
    //form field
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: [],
        selectedFile: ''
    });
    
    //finding the particular post state with id same as current id from all the posts in the state -- default value is null
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId): null);

    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    //whenever the selected post state changes,,, setPostData is called and populates the form field with the value relative to curentId
    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    //when we click the submit button to create a new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //file must be uploaded for submit to happen
        if (!postData.selectedFile) {
            alert('Please select a file');
            return;
        }
        
        //if id exists (not null) update else create
        if(currentId){
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        }
        clear();
    };
    
    //to clear the response in the create post form
    const clear =() => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: [],
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
    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
      };
    
      const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
      };
    return(
        <Paper className={classes.paper} elevation={6} >
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
                 <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags - after each tag press enter"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
                 <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                 </div>

                 <Button 
                    className={classes.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth
                >
                    Submit
                </Button>
                 <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear} 
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
