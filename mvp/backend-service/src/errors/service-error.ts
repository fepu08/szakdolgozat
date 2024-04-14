export default class ServiceError extends Error {
  public status: number;

  constructor(msg = 'Service Error', status = 400) {
    super(msg);
    Object.setPrototypeOf(this, ServiceError.prototype);
    this.name = 'ServiceError';
    this.status = status;
  }
}
