import { queryAccontBalanceByUserId } from "../services/Account";
import status from "http-status";
import { Jwt } from "../utils/Jwt";
const jwt = new Jwt();

export async function getBalance(req: any, res: any) {
  const token = req.headers.authorization;
  const userId = jwt.getUserId(token);
  let balance: any = 0;

  try {
    balance = await queryAccontBalanceByUserId(userId);
  } catch (error) {
    return res.status(status.NOT_FOUND).send;
  }
  return res.status(status.OK).json({ balance: balance });
}
