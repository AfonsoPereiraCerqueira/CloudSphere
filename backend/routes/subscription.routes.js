import express from "express";
import { cancelSubscritpion, createSubscription, savePayment } from "../Subscriptions/subscriptions.controller.js"; 
import { createSubscriptionPaymentComplete, verifyIfUserHaveActiveSubscription, manageSubscriptionsStatus, cancelSubscriptionDB } from "../Subscriptions/CreateSubscription.controller.js";
const router = express.Router();

router.post("/", createSubscription);
router.post("/save-payment", savePayment);
router.post("/create-subscription", createSubscriptionPaymentComplete);
router.post("/verify-subscription", verifyIfUserHaveActiveSubscription);
router.post("/manage-subscriptions", manageSubscriptionsStatus);
router.post("/cancel", cancelSubscritpion);
router.post("/cancel-subscription", cancelSubscriptionDB);

export default router;
