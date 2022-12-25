import status from "http-status";
import {
  insertUser,
  queryUserByEmailAddress,
  queryUserById,
} from "../services/User";
import { Jwt } from "../utils/Jwt";
const jwt = new Jwt();

export async function registerUser(req: any, res: any) {
  return (await insertUser(
    req.body.username,
    req.body.email,
    req.body.password
  ))
    ? res.status(status.CREATED).send()
    : res.status(status.BAD_REQUEST).send();
}

export function isAuthenticated(req: any, res: any) {
  const token = req.headers.authorization;

  if (!token || !jwt.verify(token))
    return res.status(status.UNAUTHORIZED).send();

  return res.status(status.OK).send();
}

export async function login(req: any, res: any) {
  const { email, password } = req.body;
  const user = await queryUserByEmailAddress(email);
  if (user === null || user.email !== email || user.password !== password) {
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
  console.log(`userId: ${userId}`);
  const user = await queryUserById(userId);
  if (user === null) {
    return res.status(status.NOT_FOUND).send();
  }
  return res.status(status.OK).send({ username: user.username });
}
