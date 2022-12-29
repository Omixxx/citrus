import status from "http-status";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.log(`err message: ${err.message}`);

  res.status(status.NOT_FOUND).send(err.message);
};
