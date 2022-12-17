import status from "http-status";
import myJwt from "../utils/jwt"
import {
  queryUserByEmailAddress,
  insertUser
} from "../services/User";

export function getUserInfo(req, res) {
  //todo: get id from jwt 
  //
  const user = queryUserById()
  if (user) {
    return { status: status.OK, data: user };
  } else {
    return { status: status.NOT_FOUND, data: null };
  }
};


export function registerUser(req: any, res: any) {
  return insertUser(req.body.name, req.body.email, req.body.password) ?
    res.status(status.CREATED).send() : res.status(status.BAD_REQUEST).send();
};

export function isAuthenticated(req: any, res: any): any {
  // prendi la risposta e valida il token JWT che è stato passato nell'header Authorization 
  // 
  // 
}
