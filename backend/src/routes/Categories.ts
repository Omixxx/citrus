import express from "express";
import {
  getExpenseCategories,
  getIncomeCategories,
} from "../controllers/Categories";
import { errorHandler } from "../middleware/errorHandler";
import tryCatch from "../utils/tryCatch";
const router = express.Router();

router.get("/income", tryCatch(getIncomeCategories));
router.get("/expense", tryCatch(getExpenseCategories));

router.use(errorHandler);

export default router;
