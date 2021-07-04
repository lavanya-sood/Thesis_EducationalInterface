import express from 'express';

// The actual code is placed inside the controllers file
import { getPosts, createPosts } from '../controllers/posts.js'; 

const router = express.Router();


// localhost:5000/posts/
router.get('/',getPosts);
router.get('/',createPosts);

export default router;