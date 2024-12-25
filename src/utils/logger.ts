/**
 * Logger utility for consistent error handling
 */
export class Logger {
  /**
   * Logs an error message
   * @param message - The error message
   * @param error - The error object
   */
  static error(message: string, error: unknown): void {
    if (process.env.NODE_ENV !== "test") {
      console.error(message, error);
    }
  }
}
