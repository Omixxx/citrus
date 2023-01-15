import express from "express";
import { addIncome, getIncomes } from "../controllers/Income";
import { errorHandler } from "../middleware/errorHandler";
import tryCatch from "../utils/tryCatch";
const router = express.Router();

router.post("/addIncome", tryCatch(addIncome));
router.get("/incomes", tryCatch(getIncomes));

router.use(errorHandler);

export default router;
