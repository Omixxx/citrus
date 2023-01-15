import { Account } from "@prisma/client";
import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";
import { updateAccountBalance } from "./Account";

export async function insertIncome(income: any, accountId: number) {
  try {
    await db.$transaction(async (transaction) => {
      const addedIncome = await transaction.income.create({
        data: income,
      });

      const updatedAccount: Account = await updateAccountBalance(
        transaction,
        income.amount,
        accountId
      );

      return {
        income: addedIncome.amount,
        accountId: updatedAccount.balance,
        currentBalance: updatedAccount.balance,
      };
    });
  } catch (err: any) {
    throw new CustomError(`Error during the transaction: `, err);
  }
}
