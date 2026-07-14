import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductById,
  getExpiringProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);

router.get("/product/:id", getProductById);

router.get(
  "/expiring/:userId",
  getExpiringProducts
);

router.put("/update/:id", updateProduct);

router.delete("/:id", deleteProduct);

// Keep this LAST
router.get("/:userId", getProducts);



export default router;