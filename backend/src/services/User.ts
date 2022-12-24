import { db } from "../config/db.server";

export function queryUserByEmailAddress(email: string) {
  return db.user.findUnique({
    where: {
      email: email,
    },
  });
};

export async function queryUserById(id: number) {
  return await db.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function insertUser(username: string, email: string, password: string) {
  return await db.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};


