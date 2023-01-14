export default class CustomError extends Error {
  status: number;
  constructor(message: string, status?: number | undefined) {
    super(message);
    this.status = status || 500;
  }
}
