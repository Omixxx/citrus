import { db } from "../config/db.server";
import { querySavingModelByName } from "./SavingModel";

export async function queryAccountById(userId: number) {
  try {
    return await db.account.findFirst({
      where: {
        ownerId: userId,
      },
    });
  } catch (error: any) {
    throw new Error(`account not found for user with id: ${userId}`);
  }
}

export async function createAccount(userId: number) {
  try {
    let savingModel = await querySavingModelByName("default");
    if (!savingModel) {
      throw new Error("saving model not found");
    }
    return await db.account.create({
      data: {
        ownerId: userId,
        savingModelId: savingModel.id,
      },
    });
  } catch (error: any) {
    throw new Error(`error creating account ${error.message}`);
  }
}

export async function queryAccontBalanceByUserId(userId: number) {
  try {
    let account = await queryAccountById(userId);
    if (!account) throw new Error("account not found");

    return account.balance;
  } catch (error: any) {
    throw new Error(`not able to get account balance, ${error.message}`);
  }
}
