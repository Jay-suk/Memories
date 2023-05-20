import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

//middleware
import auth from '../middleware/auth.js';

//setting up router -- we can define routes for our applications
const router = express.Router();

//adding our routes
//we can execute the callback function when a http request is made at the given path


//getPosts -- to get all posts from data base
router.get('/', getPosts);

//createPost -- to create a new Post
router.post('/', auth, createPost);

//for updating a post
router.patch('/:id', auth, updatePost);

//for deleting
router.delete('/:id', auth, deletePost);

//for like 
router.patch('/:id/likePost', auth, likePost);

//exporting 
export default router;