import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export async function createSavingModel(name: string, percentage: number) {
  try {
    return await db.savingModel.create({
      data: {
        name: name,
        percentage: percentage,
      },
    });
  } catch (error: any) {
    throw new CustomError(`error creating saving model `, error);
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
    throw new CustomError(`saving model not found`, error);
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
    throw new CustomError(`saving model not found`, error);
  }
}
