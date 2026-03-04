import { createRecipe, getRecipe } from "../controllers/recipe.controller.js";
import express from "express";

const router = express.Router();

router.post("/create-recipe", createRecipe);
router.post("/get-recipe", getRecipe);

export default router
