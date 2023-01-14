import { Income } from "@prisma/client";
import { insertIncome } from "../services/Income";

export async function addIncome(req: any, res: any) {
  console.log("----------------");

  const income: Income = {
    amount:* (number) req.body.amount,
    category: ()req.body.categoryId,
    data: req.body.data,
  };
  const result = await insertIncome(income);
  return res.status(200).send(`income succesfully added: ${result.id}`);
}
