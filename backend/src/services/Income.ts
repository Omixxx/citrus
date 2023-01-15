import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export async function insertIncome(income: any, accountId: number) {
  try {
    await db.$transaction(async (transaction) => {
      const addedIncome = await transaction.income.create({
        data: income,
      });

      const updatedAccount = await transaction.account.update({
        where: { id: accountId },
        data: {
          balance: {
            increment: income.amount,
          },
        },
      });

      return {
        income: addedIncome.amount,
        accountId: updatedAccount.id,
        currentBalance: updatedAccount.balance,
      };
    });
  } catch (err: any) {
    throw new CustomError(`Error during the transaction: `, err);
  }
}

export async function queryIncomes(accountId: number) {
  try {
    return await db.income.findMany({
      where: {
        accountId: accountId,
      },
    });
  } catch (err: any) {
    throw new CustomError(`Error while fetching the data from db`, err);
  }
}
