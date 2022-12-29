import { db } from "../config/db.server";

export async function createSavingModel(name: string, percentage: number) {
  return await db.savingModel.create({
    data: {
      name: name,
      percentage: percentage,
    },
  });
}

export async function querySavingModelByName(name: string) {
  return await db.savingModel.findFirst({
    where: {
      name: name,
    },
  });
}

export async function querySavingModelByPercentage(percentage: number) {
  return await db.savingModel.findFirst({
    where: {
      percentage: percentage,
    },
  });
}
