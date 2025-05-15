import express from 'express'
import isAunthenticated from "../middleware/isAuthenticated.js"
import { getCourceProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from '../controller/courceProgress.controller.js'
const router=express.Router()
router.route("/:courceId").get(isAunthenticated,getCourceProgress)
router.route("/:courceId/lecture/:lectureId/view").post(isAunthenticated,updateLectureProgress)
router.route("/:courceId/complete").post(isAunthenticated,markAsCompleted)
router.route("/:courceId/incomplete").post(isAunthenticated,markAsInCompleted)

export default router;