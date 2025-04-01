import express from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { createCource, createLecture, editCource, getCourceById, getCourceLecture, getCreatorCources } from '../controller/cource.controller.js';
import upload from '../utils/multer.js'
const router=express.Router();
router.route("/").post(isAuthenticated,createCource)
router.route("/").get(isAuthenticated,getCreatorCources)
router.route("/:courceId").put(isAuthenticated,upload.single("courceThumbnail"),editCource)
router.route("/:courceId").get(isAuthenticated,getCourceById)
router.route("/:courceId/lecture").post(isAuthenticated,createLecture)
router.route("/:courceId/lecture").get(isAuthenticated, getCourceLecture)
export default router; 