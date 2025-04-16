import express from 'express';

import isAuthenticated from '../middleware/isAuthenticated.js';
import { createCource, createLecture, editCource, editLecture, getCourceById, getCourceLecture, getCreatorCources, getLectureById, removeLecture, togglePublishCource } from '../controller/cource.controller.js';
import upload from '../utils/multer.js'
const router=express.Router();
router.route("/").post(isAuthenticated,createCource)
router.route("/").get(isAuthenticated,getCreatorCources)
router.route("/:courceId").put(isAuthenticated,upload.single("courceThumbnail"),editCource)
router.route("/:courceId").get(isAuthenticated,getCourceById)
router.route("/:courceId/lecture").post(isAuthenticated,createLecture)
router.route("/:courceId/lecture").get(isAuthenticated,getCourceLecture)
router.route("/:courceId/lecture/:lectureId").post(isAuthenticated,editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture)
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById)
router.route("/:courceId").patch(isAuthenticated,togglePublishCource)
export default router; 