export const tryCatch = (functionToTry: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await functionToTry(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
