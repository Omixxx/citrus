import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export async function insertExpense(expense: any, accountId: number) {
  try {
    await db.$transaction(async (transaction) => {
      const addedExpense = await transaction.expense.create({
        data: expense,
      });

      const updatedAccount = await transaction.account.update({
        where: { id: accountId },
        data: {
          balance: {
            decrement: expense.amount,
          },
        },
      });

      if (updatedAccount.balance < 0) {
        throw new CustomError(`Insufficient funds`, 400);
      }

      return {
        income: addedExpense.amount,
        accountId: updatedAccount.id,
        currentBalance: updatedAccount.balance,
      };
    });
  } catch (err: any) {
    throw new CustomError(`Error during the transaction: `, err);
  }
}
