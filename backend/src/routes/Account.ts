import express from "express";
import { getBalance } from "../controllers/Account";
const router = express.Router();

router.get("/balance", getBalance);

export default router;
