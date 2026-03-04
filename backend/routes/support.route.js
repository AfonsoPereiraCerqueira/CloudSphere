import express from "express";
import { getSingleSupportContact, getSupportContacts, createSupportContact, updateSupportContact, deleteSupportContact } from "../controllers/support.controller.js";
const router = express.Router();



router.get("/", getSupportContacts);
router.get("/:id", getSingleSupportContact);
router.post("/create", createSupportContact);
router.put("/:id", updateSupportContact);
router.delete("/:id", deleteSupportContact);

export default router