export default function tryCatch(controller: (req: any, res: any) => any) {
  return async (req: any, res: any, next: any) => {
    try {
      await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
}
