import express from "express";
const router = express.Router();

import { getSingleDescount, createDescount, verifyDescount } from "../controllers/descount.controller.js";

router.post("/create", createDescount);
router.post("/verify", verifyDescount);
router.post("/:id", getSingleDescount);

export default router;
