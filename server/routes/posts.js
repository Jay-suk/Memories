import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

//setting up router
//we can define routes for our applications
const router = express.Router();

//adding our routes

//get requests from this path will take callback getPosts
//getPosts -- to get all posts from data base
router.get('/', getPosts);
//when user submits the form, createPost function will be called
//createPost -- to create a new Post
router.post('/', createPost);

//for updating a post
router.patch('/:id', updatePost);

//for deleting
router.delete('/:id', deletePost);

//for like 
router.patch('/:id/likePost', likePost);


//exporting 
export default router;