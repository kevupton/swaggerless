
export class Exception {
  constructor (
    public errorMessage : string,
    public statusCode = 400
  ) {}
}
