import express from 'express';

import { getPosts, createPost } from '../controllers/posts.js';

//setting up router
//we can define routes for our applications
const router = express.Router();

//adding our routes

router.get('/', getPosts);
router.post('/', createPost);

//exporting 
export default router;