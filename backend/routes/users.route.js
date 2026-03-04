import express from "express";
import { getUsers, getSingleUser, updateUser, deleteUser, getSingleUserByName } from "../controllers/users.controller.js";
import { registerUser, loginUser, verifyEmail, logout, forgotPassword, resetPassword, checkAuth, desactivateUser, activateUser } from "../controllers/auth/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();


router.get("/check-auth", verifyToken, checkAuth);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/name/", getSingleUserByName);
router.post("/verify-email", verifyEmail);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/desactivate-user", desactivateUser);
router.post("/activate-user", activateUser);

export default router