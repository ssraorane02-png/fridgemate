import express from "express";
import {
  addShoppingItem,
  getShoppingItems,
  updateShoppingItem,
  deleteShoppingItem,
} from "../controllers/shoppingController.js";

const router = express.Router();

// Add item
router.post("/add", addShoppingItem);

// Get all items of a user
router.get("/:userId", getShoppingItems);

// Update item
router.put("/:id", updateShoppingItem);

// Delete item
router.delete("/:id", deleteShoppingItem);

export default router;