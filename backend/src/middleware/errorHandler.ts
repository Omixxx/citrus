export const errorHandler = (err: CustomError, res: any) => {
  console.log(
    `\n\nerror message: ${err.message}\n\n error status: ${err.status}`
  );

  res.status(err.status).send(err.message);
};
