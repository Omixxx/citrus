import { queryAccountById } from "../services/Account";
import { insertIncome, queryIncomes } from "../services/Income";
import CustomError from "../utils/CustomError";
import { Jwt } from "../utils/Jwt";
const jwt = new Jwt();

export async function addIncome(req: any, res: any) {
  const userId = jwt.getUserId(req.headers.authorization);
  const account = await queryAccountById(userId);
  if (!account)
    throw new CustomError(`account not found for user with id: ${userId}`, 404);

  const income = {
    amount: req.body.amount,
    categoryId: req.body.categoryId,
    date: req.body.date,
    accountId: account.id,
  };
  let transaction: any;

  try {
    transaction = await insertIncome(income, account.id);
  } catch (error: any) {
    throw new CustomError(`Income insetion failed`, error, 400);
  }
  return res.status(200).send(transaction);
}

export async function getIncomes(req: any, res: any) {
  const userId = jwt.getUserId(req.headers.authorization);
  const account = await queryAccountById(userId);
  if (!account)
    throw new CustomError(`account not found for user with id: ${userId}`, 404);

  const incomes = await queryIncomes(account.id);
  incomes ? res.status(200).send(incomes) : res.status(404).send();
}
