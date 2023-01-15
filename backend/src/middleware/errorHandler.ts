import CustomError from "../utils/CustomError";

export function errorHandler(
  error: CustomError,
  req: any,
  res: any,
  next: any
) {
  console.log(`${error.message} \n ${error.status}`);

  return res.status(error.status).send(error.message);
}
