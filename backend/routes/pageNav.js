import express from 'express';

// The actual code is placed inside the controllers file
import { addPageNavigation } from '../controllers/pageNav.js'; 

// the express router
const router = express.Router();

// localhost:5000/answers/
router.post('/',addPageNavigation);

export default router;