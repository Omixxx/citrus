import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export async function insertExpense(
  expense: any,
  accountId: number
): Promise<Object> {
  return await db
    .$transaction(async (transaction) => {
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
        balance: updatedAccount.balance,
      };
    })
    .catch((err: any) => {
      throw new CustomError(`Error during the transaction: `, err);
    });
}

export async function queryExpenses(accountId: number) {
  try {
    return await db.expense.findMany({
      where: {
        accountId: accountId,
      },
    });
  } catch (err: any) {
    throw new CustomError(`Error while fetching the data from db`, err);
  }
}
