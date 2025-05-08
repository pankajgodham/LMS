import express from 'express'
import isAunthenticated from "../middleware/isAuthenticated.js"
import { getCourceProgress, markAsCompleted, markAsInCompleted, updateLectureProgress } from '../controller/courceProgress.controller.js'
const router=express.Router()
router.route("/:courceId").get(isAunthenticated,getCourceProgress)
router.route("/:courceId/lecture/:lectureId/view").post(isAunthenticated,updateLectureProgress)
router.route("/:courceId/complete").get(isAunthenticated,markAsCompleted)
router.route("/:courceId/incomplete").get(isAunthenticated,markAsInCompleted)

export const router;