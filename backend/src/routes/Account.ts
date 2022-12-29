import express from "express";
import { getBalance } from "../controllers/Account";
import { errorHandler } from "../middleware/errorHandler";
import { tryCatch } from "../utils/tryCatch";
const router = express.Router();

router.get("/balance", tryCatch(getBalance));

router.use(errorHandler);

export default router;
