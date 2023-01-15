import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";
import { querySavingModelByName } from "./SavingModel";

export async function queryAccountById(userId: number) {
  try {
    return await db.account.findFirst({
      where: {
        ownerId: userId,
      },
    });
  } catch (error: any) {
    throw new CustomError(`account not found for user with id: ${userId}`);
  }
}

export async function createAccount(userId: number) {
  try {
    let savingModel = await querySavingModelByName("Classic");
    if (!savingModel) {
      throw new CustomError("saving model not found");
    }
    return await db.account.create({
      data: {
        ownerId: userId,
        savingModelId: savingModel.id,
      },
    });
  } catch (error: any) {
    throw new CustomError(
      `error creating account ${error.message}`,
      error.stack
    );
  }
}

export async function queryAccontBalanceByUserId(userId: number) {
  try {
    let account = await queryAccountById(userId);
    if (!account) throw new CustomError("account not found");

    return account.balance;
  } catch (error: any) {
    throw new CustomError(`not able to get account balance`, error);
  }
}

export async function updateAccountBalance(
  transaction: any,
  accountId: number,
  amount: number
) {
  try {
    return await transaction.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  } catch (error: any) {
    throw new CustomError(`not able to update account balance`, error);
  }
}
