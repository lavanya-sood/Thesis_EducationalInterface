import express from 'express';

// The actual code is placed inside the controllers file
import { addUserAnswer } from '../controllers/answers.js'; 

// the express router
const router = express.Router();

// localhost:5000/answers/
router.post('/',addUserAnswer);

export default router;