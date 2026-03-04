import express from "express";
import { getPlan, getSinglePlan, createPlan, updatePlan, deletePlan, getPlanByName } from "../controllers/plan.controller.js";
const router = express.Router();

router.get("/", getPlan);
router.get("/:id", getSinglePlan)
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);
router.post("/name/", getPlanByName)

export default router