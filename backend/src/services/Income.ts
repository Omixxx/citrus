import { Income } from "@prisma/client";
import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export async function insertIncome(income: Income): Promise<Income> {
  try {
    return db.income.create({
      data: income,
    });
  } catch (err) {
    throw new CustomError(`database Error, ${err}`, 500);
  }
}
