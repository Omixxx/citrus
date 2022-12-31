import { db } from "../config/db.server";

export async function createSavingModel(name: string, percentage: number) {
  try {
    return await db.savingModel.create({
      data: {
        name: name,
        percentage: percentage,
      },
    });
  } catch (error: any) {
    throw new Error(`error creating saving model ${error.message}`);
  }
}

export async function querySavingModelByName(name: string) {
  try {
    return await db.savingModel.findFirst({
      where: {
        name: name,
      },
    });
  } catch (error: any) {
    throw new Error(`saving model not found${error.message}`);
  }
}

export async function querySavingModelByPercentage(percentage: number) {
  try {
    return await db.savingModel.findFirst({
      where: {
        percentage: percentage,
      },
    });
  } catch (error: any) {
    throw new Error(`saving model not found${error.message}`);
  }
}
