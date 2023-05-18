
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
    //saving the request in post
    const post = req.body;
    //creating the new post by adding to data base
    const newPost = new PostMessage(post);

    try {
        //saving the post
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

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}