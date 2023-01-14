import { db } from "../config/db.server";

export async function queryIncomeCategories() {
  try {
    return await db.incomeCategory.findMany();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
