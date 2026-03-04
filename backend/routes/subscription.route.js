import express from "express";
import { getSubscription, getSingleSubscription, deleteSubscription, getSubscriptionByName, getSubscriptionByUserId } from "../controllers/subscription.controller.js";
const router = express.Router();


router.get("/", getSubscription);
router.get("/:id", getSingleSubscription);
router.delete("/:id", deleteSubscription);
router.get("/name/:name", getSubscriptionByName);
router.post("/userId", getSubscriptionByUserId);


export default router