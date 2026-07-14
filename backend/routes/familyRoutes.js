import express from "express";
import {
  sendInvite,
  joinFamily,
  getMembers,
  removeMember,
} from "../controllers/familyController.js";

const router = express.Router();

router.post(
  "/invite",
  sendInvite
);

router.post(
  "/join",
  joinFamily
);

router.get(
  "/:userId",
  getMembers
);
router.delete(
  "/remove",
  removeMember
);

export default router;