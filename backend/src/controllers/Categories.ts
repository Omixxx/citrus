import {
  queryExpenseCategories,
  queryIncomeCategories,
} from "../services/Categories";
import CustomError from "../utils/CustomError";

export async function getIncomeCategories(req: any, res: any) {
  let categories = {};
  try {
    categories = await queryIncomeCategories();
    if (!categories) {
      throw new CustomError("No income categories found", 404);
    }
  } catch (err) {
    throw new CustomError("error getting income categories", err);
  }
  return res.status(200).send(categories);
}

export async function getExpenseCategories(req: any, res: any) {
  let categories = {};
  try {
    categories = await queryExpenseCategories();
    if (!categories) {
      throw new CustomError("No categories found", 404);
    }
  } catch (error) {
    throw new CustomError("error getting expense categories", 500);
  }

  return res.status(200).send(categories);
}
