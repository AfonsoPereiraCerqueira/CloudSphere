import express from "express";
import { getEmployees, getSingleEmployee, updateEmployee, deleteEmployee, getSingleEmployeeByName } from "../controllers/employee.controller.js";
import { registerEmployee, loginEmployee, verifyAdmin, checkAuthEmployee, logoutEmployee, desactivateEmployee, activateEmployee } from "../controllers/auth/auth.js"
import { verifyTokenEmployee } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyTokenEmployee, checkAuthEmployee);
router.get("/", getEmployees);
router.get("/:id", getSingleEmployee);
router.post("/verify/:id", verifyAdmin);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.post("/name", getSingleEmployeeByName);
router.post("/logout", logoutEmployee);
router.post("/desactivate-employee", desactivateEmployee);
router.post("/activate-employee", activateEmployee);
export default router