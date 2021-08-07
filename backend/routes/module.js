import express from 'express';

// the actual code is placed inside the controllers file
import { getAllModules, getSpecificModule } from '../controllers/module.js'; 

// create the express router
const router = express.Router();

// localhost:5000/module/
router.get('/',getAllModules);
router.get('/:questionNumber',getSpecificModule);

export default router;