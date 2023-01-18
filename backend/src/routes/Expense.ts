import express from "express";
import { addExpense, getExpenses } from "../controllers/Expense";
import { errorHandler } from "../middleware/errorHandler";
import tryCatch from "../utils/tryCatch";
const router = express.Router();

router.post("/addExpense", tryCatch(addExpense));
router.get("/expenses", tryCatch(getExpenses));

router.use(errorHandler);

export default router;
