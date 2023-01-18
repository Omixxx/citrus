import chalk from "chalk";

export default class CustomError extends Error {
  public status: number;
  constructor(message: string, error: any = undefined, status?: number) {
    super(`${chalk.blue(`--> `)}${chalk.red(message)}\n${error.message || ""}`);
    this.status = status || 500;
  }
}
