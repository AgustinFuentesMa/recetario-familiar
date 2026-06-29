const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createRecipe,
  getRecipes,
  getRecipesByLetter,
  updateRecipe,
  deleteRecipe,
  getSharedRecipe
} = require("../controllers/recipeController");

router.post(
  "/",
  authMiddleware,
  createRecipe
);

router.get(
  "/",
  authMiddleware,
  getRecipes
);

router.get(
  "/letter/:letter",
  authMiddleware,
  getRecipesByLetter
);

router.put(
  "/:id",
  authMiddleware,
  updateRecipe
);

router.delete(
  "/:id",
  authMiddleware,
  deleteRecipe
); 

router.get(
  "/shared/:id",
  getSharedRecipe
);

module.exports = router;    