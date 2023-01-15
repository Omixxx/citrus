import { queryAccountById } from "../services/Account";
import { insertExpense, queryExpenses } from "../services/Expense";
import CustomError from "../utils/CustomError";
import { Jwt } from "../utils/Jwt";
const jwt = new Jwt();

export async function addExpense(req: any, res: any) {
  const userId = jwt.getUserId(req.headers.authorization);
  const account = await queryAccountById(userId);
  if (!account) {
    throw new CustomError(`account not found for user with id: ${userId}`, 404);
  }

  const expense = {
    amount: req.body.amount,
    categoryId: req.body.categoryId,
    date: req.body.date,
    accountId: account.id,
  };
  let transaction: any;
  try {
    transaction = await insertExpense(expense, account.id);
  } catch (error: any) {
    throw new CustomError(`expense insetion failed`, error, 400);
  }
  return res.status(200).send({ transaction });
}

export async function getExpenses(req: any, res: any) {
  const userId = jwt.getUserId(req.headers.authorization);
  const account = await queryAccountById(userId);
  if (!account) {
    throw new CustomError(`account not found for user with id: ${userId}`, 404);
  }

  const expenses = await queryExpenses(account.id);
  expenses ? res.status(200).send(expenses) : res.status(404).send();
}
