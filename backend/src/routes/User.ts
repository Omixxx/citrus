import express from "express";
const router = express.Router();
import {
  getUserInfo,
  registerUser
} from "../controllers/User";

router.get("/:email", getUserInfo);
router.post("/signup", registerUser);

export default router;
