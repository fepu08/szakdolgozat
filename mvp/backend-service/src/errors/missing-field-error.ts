export default class MissingRequiredFieldError extends Error {
  constructor(fieldName: string) {
    super(`Field is required: ${fieldName}`);
    Object.setPrototypeOf(this, MissingRequiredFieldError.prototype);
    this.name = 'MissingRequiredFieldError';
  }
}
