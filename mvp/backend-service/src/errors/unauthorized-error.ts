export default class UnauthorizedError extends Error {
  public status = 401;

  constructor(msg = 'Unauthorized') {
    super(msg);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.name = 'UnauthorizedError';
  }
}
