class CustomError extends Error {
  errorEtatus: number;
  constructor(message: string, public status: number) {
    super(message);
    this.errorEtatus = status;
  }
}
