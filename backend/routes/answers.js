import express from 'express';

// The actual code is placed inside the controllers file
//import { getPosts, createPosts } from '../controllers/posts.js'; 
import { addUserAnswer } from '../controllers/answers.js'; 

const router = express.Router();


// localhost:5000/answers/
router.post('/',addUserAnswer);

export default router;