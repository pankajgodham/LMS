import express from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { createCource, getCreatorCources } from '../controller/cource.controller.js';

const router=express.Router();
router.route("/").post(isAuthenticated,createCource)
router.route("/").get(isAuthenticated,getCreatorCources)
export default router;