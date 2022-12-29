import { db } from "../config/db.server";
import { createSavingModel, querySavingModelByName } from "./SavingModel";

export async function queryAccountById(userId: number) {
  try {
    return await db.account.findFirst({
      where: {
        ownerId: userId,
      },
    });
  } catch (error: any) {
    throw new Error("account not found");
  }
}

export async function createAccount(userId: number) {
  let savingModel = await querySavingModelByName("default");
  if (savingModel === null || savingModel === undefined) {
    savingModel = await createSavingModel("default", 0);
  }

  return await db.account.create({
    data: {
      ownerId: userId,
      savingModelId: savingModel.id,
    },
  });
}

export async function queryAccontBalanceByUserId(userId: number) {
  let account: any;
  try {
    account = await queryAccountById(userId);
  } catch (error) {
    throw new Error(error.message + " in queryAccontBalanceByUserId");
  }
  return account.balance;
}
