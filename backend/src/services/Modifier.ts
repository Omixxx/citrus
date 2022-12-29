import { db } from "../config/db.server";

export async function createModifier(name: string, description: string) {
  return await db.modifier.create({
    data: {
      name: name,
      description: description,
    },
  });
}
