import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export async function queryIncomeCategories() {
  try {
    return await db.incomeCategory.findMany();
  } catch (err: any) {
    throw new CustomError(`error while fetchin categories`, err);
  }
}
