/**
 * Error thrown when an invalid email address is provided
 * @class InvalidEmailError
 * @extends {Error}
 */
export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`Invalid email address: ${email}`);
    this.name = "InvalidEmailError";
  }
}
