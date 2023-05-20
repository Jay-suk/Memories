import express from 'express';

import { signin, signup } from '../controllers/users.js';

//setting up router--we can define routes for our applications
const router = express.Router();

//sign in
router.post('/signin' , signin);

//sign up
router.post('/signup' , signup);

export default router;