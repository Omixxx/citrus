import status from "http-status";
import { verify } from "../utils/jwt";
import { insertUser } from "../services/User";

export async function registerUser(req: any, res: any) {
  return await insertUser(req.body.name, req.body.email, req.body.password)
    ? res.status(status.CREATED).send()
    : res.status(status.BAD_REQUEST).send();
}

export function isAuthenticated(req: any, res: any): any {
  const token = req.headers.authorization;
  if (!token || !verify(token)) return res.status(status.UNAUTHORIZED).send();

  return res.status(status.OK).send();
}
