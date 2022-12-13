import express from "express";
const router = express.Router();
import {
  ControllerGetUserInfoByEmailAddress,
  InsertUser,
} from "../controllers/User";

router.get("/:email", ControllerGetUserInfoByEmailAddress);
router.post("/signup", InsertUser);

export default router;
