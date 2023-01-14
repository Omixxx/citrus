import { queryIncomeCategories } from "../services/Categories";

export async function getIncomeCategories(req: any, res: any) {
  const categories = await queryIncomeCategories();
  return res.status(200).send(categories);
}
