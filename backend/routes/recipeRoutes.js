import express from "express";
import {
  getRecipes,
  getRecipeDetails,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get(
  "/details/:id",
  getRecipeDetails
);

router.get(
  "/:userId",
  getRecipes
);

export default router;