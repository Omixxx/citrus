import status from "http-status";
import {
  ServiceQueryUserByEmailAddress,
  ServiceInsertUser,
} from "../services/User";

export const ControllerGetUserInfoByEmailAddress = (email: string) => {
  const user = ServiceQueryUserByEmailAddress(email);
  if (user) {
    return { status: status.OK, data: user };
  } else {
    return { status: status.NOT_FOUND, data: null };
  }
};

export const InsertUser = (req, res) => {
  if (ServiceInsertUser(req.body.name, req.body.email, req.body.password))
    return res.status(status.CREATED).send();

  return res.status(status.BAD_REQUEST).send();
};
