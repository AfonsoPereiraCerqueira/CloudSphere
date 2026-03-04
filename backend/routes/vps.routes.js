import express from "express";
import { generateNewVPS, getVPS, TurnOffVPS, TurnOnVPS, RebootVPS } from "../VirtualPrivateServers/vps.controller.js";

const router = express.Router();

router.post("/create-vps", generateNewVPS);
router.post("/get-vps", getVPS);
router.post("/turn-off-vps", TurnOffVPS);
router.post("/turn-on-vps", TurnOnVPS);
router.post("/reboot-vps", RebootVPS);

export default router