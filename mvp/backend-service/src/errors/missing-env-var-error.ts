export default class MissingEnvVarError extends Error {
  constructor(variableName: string) {
    super(`Environment variable is missing: ${variableName}`);
    Object.setPrototypeOf(this, MissingEnvVarError.prototype);
    this.name = 'MissingEnvVarError';
  }
}
