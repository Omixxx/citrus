import { db } from "../config/db.server";
import CustomError from "../utils/CustomError";

export function queryUserByEmailAddress(email: string) {
  try {
    return db.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error: any) {
    throw new CustomError(`User Not found `, error);
  }
}

export async function queryUserById(id: number) {
  try {
    return await db.user.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    throw new CustomError(`User Not found `, error);
  }
}

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  try {
    return await db.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
  } catch (error: any) {
    throw new CustomError(`error creating user: \n`, error);
  }
}
