import { warn } from "console";
import status from "http-status";
import { insertUser, queryUserById } from "../services/User";
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

export function isAuthenticated(req: any, res: any): any {
  const token = req.headers.authorization;
  if (!token || !jwt.verify(token))
    return res.status(status.UNAUTHORIZED).send();

  return res.status(status.OK).send();
}

export async function login(req: any, res: any) {
  const token = req.headers.authorization;
  console.log(token);

  if (!jwt.verify(token)) return res.status(status.UNAUTHORIZED).send();

  const { email, password } = req.body;
  const userId = jwt.getUserId(token);
  const user = await queryUserById(userId);
  if (user === null || user.email !== email || user.password !== password) {
    return res.status(status.UNAUTHORIZED).send();
  }

  return res.status(status.OK).send();
}
