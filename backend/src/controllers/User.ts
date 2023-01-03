import status from "http-status";
import { Jwt } from "../utils/Jwt";
import {
  createUser,
  queryUserByEmailAddress,
  queryUserById,
} from "../services/User";
import { createAccount } from "../services/Account";

let Hashes = require("jshashes");
const SHA256 = new Hashes.SHA256();
const jwt = new Jwt();

export async function registerUser(req: any, res: any) {
  const user = await createUser(
    req.body.username,
    req.body.email,
    SHA256.hex(req.body.password)
  );

  user !== null && user !== undefined && (await createAccount(user.id))
    ? res.status(status.CREATED).send()
    : res.status(status.BAD_REQUEST).send();
}

export function isAuthenticated(req: any, res: any) {
  const token = req.headers.authorization;

  if (!token || !jwt.verify(token))
    throw new CustomError("User is not authenticated", status.UNAUTHORIZED);

  return res.status(status.OK).send();
}

export async function login(req: any, res: any) {
  const { email, password } = req.body;
  const user = await queryUserByEmailAddress(email);
  if (
    user === null ||
    user.email !== email ||
    user.password !== SHA256.hex(password)
  ) {
    return res.status(status.UNAUTHORIZED).send();
  }

  return res.status(status.OK).send({ token: jwt.generateToken(user.id) });
}

export async function getUsername(req: any, res: any) {
  const token = req.headers.authorization;
  if (!jwt.verify(token)) {
    return res.status(status.UNAUTHORIZED).send();
  }
  const userId = jwt.getUserId(token);
  const user = await queryUserById(userId);
  if (user === null) {
    return res.status(status.NOT_FOUND).send();
  }
  return res.status(status.OK).send({ username: user.username });
}
