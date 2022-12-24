import express from "express";
const router = express.Router();
import {
  getUsername,
  isAuthenticated,
  login,
  registerUser,
} from "../controllers/User";

router.get("/isAuth", isAuthenticated);
router.post("/signup", registerUser);
router.post("/login", login);
router.get("/user/username", getUsername);

export default router;
