import { queryAccountById, updateAccountBalance } from "../services/Account";
import { insertIncome } from "../services/Income";
import { Jwt } from "../utils/Jwt";
const jwt = new Jwt();

export async function addIncome(req: any, res: any) {
  const userId = jwt.getUserId(req.headers.authorization);
  const account = await queryAccountById(userId);
  if (!account)
    throw new Error(`account not found for user with id: ${userId}`);

  const income = {
    amount: req.body.amount,
    categoryId: req.body.categoryId,
    date: req.body.data,
    accountId: account.id,
  };
  await updateAccountBalance(account.id, income.amount);
  await insertIncome(income);

  return res.status(200).send(`income succesfully added`);
}
