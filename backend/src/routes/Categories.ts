import express from "express";
import { getIncomeCategories } from "../controllers/Categories";
import { errorHandler } from "../middleware/errorHandler";
import { tryCatch } from "../utils/tryCatch";
const router = express.Router();

router.get("/income", tryCatch(getIncomeCategories));

router.use(errorHandler);

export default router;
