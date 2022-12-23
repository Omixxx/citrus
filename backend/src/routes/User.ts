import express from "express";
const router = express.Router();
import { isAuthenticated, registerUser } from "../controllers/User";

router.get("/isAuth", isAuthenticated);
router.post("/signup", registerUser);

export default router;
