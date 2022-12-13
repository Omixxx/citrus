import { db } from "../config/db.server";

export const ServiceQueryUserByEmailAddress = (email: string) => {
  return db.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const ServiceInsertUser = (
  username: string,
  email: string,
  password: string
) => {
  return db.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
};
