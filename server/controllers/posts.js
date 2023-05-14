//callback function for get method (in posts.js of routes) is defined here
import PostMessage from '../models/postMessage.js';

//callback functions for our get methods

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