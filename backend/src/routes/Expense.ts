import express from "express";
import { addExpense } from "../controllers/Expense";
import { errorHandler } from "../middleware/errorHandler";
import tryCatch from "../utils/tryCatch";
const router = express.Router();

router.post("/addExpense", tryCatch(addExpense));

router.use(errorHandler);

export default router;
