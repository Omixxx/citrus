import { queryAccontBalanceByUserId } from "../services/Account";
import status from "http-status";
import { Jwt } from "../utils/Jwt";
const jwt = new Jwt();

export async function getBalance(req: any, res: any) {
  const token = req.headers.authorization;
  const userId = jwt.getUserId(token);

  try {
    let balance = await queryAccontBalanceByUserId(userId);
    return res.status(status.OK).json({ balance: balance });
  } catch (error: any) {
    throw new CustomError(error.message, status.NOT_FOUND);
  }
}
