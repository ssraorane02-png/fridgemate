import express from "express";
import {
  getUser,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);

router.put(
  "/change-password/:id",
  changePassword
);

export default router;