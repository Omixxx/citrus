import express from "express";
const router = express.Router();
import { isAuthenticated, login, registerUser } from "../controllers/User";

router.get("/isAuth", isAuthenticated);
router.post("/signup", registerUser);
router.post("/login", login);

export default router;
