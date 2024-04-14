export default class NotFoundError extends Error {
  constructor(msg: string = 'Not found') {
    super(msg);
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.name = 'NotFoundError';
  }
}
