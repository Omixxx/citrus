import { db } from "../config/db.server";

export async function createOption(name: string, description: string) {
  return await db.option.create({
    data: {
      name: name,
      description: description,
    },
  });
}
