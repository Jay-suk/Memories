import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

//setting up router so we can define routes for our applications
const router = express.Router();

//adding our routes
//we can execute the callback function when a http request is made at the given path

//fetch all posts from data base
router.get('/', getPosts);

//create a new Post
router.post('/', createPost);

//for updating a post
router.patch('/:id', updatePost);

//for deleting
router.delete('/:id', deletePost);

//for like 
router.patch('/:id/likePost', likePost);


//exporting 
export default router;