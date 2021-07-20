import express from 'express';

// The actual code is placed inside the controllers file
//import { getPosts, createPosts } from '../controllers/posts.js'; 
import { getAllModules, getSpecificModule } from '../controllers/module.js'; 

const router = express.Router();


// localhost:5000/posts/
router.get('/',getAllModules);
router.get('/:questionNumber',getSpecificModule);
//router.get('/',getSpecificModule);
//router.get('/',createPosts);

export default router;