
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


//this method is for fetching posts from db
export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

//this method is for creating a new post
export const createPost = async (req,res) => {
    
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//for updating post
export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
    {
        return res.status(404).send('No post with that id');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
}

//for deleting post
export const deletePost = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

//for liking a post
export const likePost = async(req,res) => {
    const { id } = req.params;

    if(!req.userId)
    {
        return res.json({ message: "Unauthenticated" });
    }

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No post with that id');
    }

    //finding the post with that postID
    const post = await PostMessage.findById(id);

    //from all the likes on that post,,we are finding the one for the current user
    const index = post.likes.findIndex((id) => id === String(req.userId) );

    //if no such like exists ,means the user hasn't liked it earlier -- like is added
    //else like is removed
    if(index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId) );
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}