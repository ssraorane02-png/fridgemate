import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updateAvatar,
} from "../controllers/authController.js";

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.put("/avatar", updateAvatar);

export default router;