import status from "http-status";
import CustomError from "../utils/CustomError";

export const errorHandler = (err: CustomError | Error, res: any) => {
  if (err instanceof CustomError) {
    console.log(
      `\nerror message: ${err.message}\n error status: ${err.status}`
    );
    return res.status(err.status).json({ message: err.message });
  }
  res.status(status[500]).send(err.message);
};
