import express from 'express';
import { getPosts, getPost, getPostsBySearch , createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/posts.js';

//middleware
import auth from '../middleware/auth.js';

//setting up router -- we can define routes for our applications
const router = express.Router();

//adding our routes
//we can execute the callback function when a http request is made at the given path


//getPosts -- to get all posts from data base
router.get('/', getPosts);

//getPostsBySearch -- to get the post by search
router.get('/search', getPostsBySearch);

//getPost -- to get a single post
router.get('/:id',getPost);

//createPost -- to create a new Post
router.post('/', auth, createPost);

//for updating a post
router.patch('/:id', auth, updatePost);

//for deleting
router.delete('/:id', auth, deletePost);

//for like 
router.patch('/:id/likePost', auth, likePost);

//for comment
router.post('/:id/commentPost', auth, commentPost);
//exporting 
export default router;