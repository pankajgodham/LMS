import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCource, getCourceDetailWithPurchaseDetail, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controller/purchaseCource.controller.js';
const router=express.Router()
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckoutSession)
router.route("/webhook").post(express.raw({type:"application/json"}),stripeWebhook)
router.route("/cource/:courceId/detail-with-status").get(isAuthenticated,getCourseDetailWithPurchaseStatus)

router.route("/").get(isAuthenticated,getAllPurchasedCource);

export default router;