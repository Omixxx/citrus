import express from "express";
import { addIncome } from "../controllers/Income";
import { errorHandler } from "../middleware/errorHandler";
import tryCatch from "../utils/tryCatch";
const router = express.Router();

router.post("/addIncome", tryCatch(addIncome));

router.use(errorHandler);

export default router;
