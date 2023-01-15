import CustomError from "../utils/CustomError";
import chalk from "chalk";

export function errorHandler(
  error: CustomError,
  req: any,
  res: any,
  next: any
) {
  console.log(
    `${error.message} \n ${chalk.blue(`--> `)}${chalk.yellow(
      `return status:`,
      error.status
    )}`
  );
  return res.status(error.status).send(error);
}
