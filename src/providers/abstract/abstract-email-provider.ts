import { IEmailProvider } from "../../core/interfaces/email-provider.js";
import { EmailMessage } from "../../core/types/email-message.js";
import { InvalidEmailError } from "../../core/errors/invalid-email-error.js";

/**
 * Configuration options for email providers
 * @interface EmailProviderConfig
 */
export interface EmailProviderConfig {
  maxRetries: number;
  retryDelay: number;
}

/**
 * Abstract base class for email providers
 * Implements common functionality like retry mechanism and validation
 * @abstract
 * @class AbstractEmailProvider
 * @implements {IEmailProvider}
 */
export abstract class AbstractEmailProvider implements IEmailProvider {
  protected config: EmailProviderConfig;

  constructor(
    config: EmailProviderConfig = { maxRetries: 3, retryDelay: 1000 },
  ) {
    this.config = config;
  }

  /**
   * Sends an email with retry mechanism
   * @param {EmailMessage} message - The email message to be sent
   * @returns {Promise<boolean>} True if the email was sent successfully, false otherwise
   * @throws {InvalidEmailError} If any email address is invalid
   * @throws {Error} If required fields are missing
   */
  public async sendEmail(message: EmailMessage): Promise<boolean> {
    this.validateMessage(message);

    let retries = 0;
    while (retries <= this.config.maxRetries) {
      try {
        return await this.sendEmailRequest(message);
      } catch (error) {
        if (retries === this.config.maxRetries) {
          console.error("Max retries reached", error);
          return false;
        }
        await this.delay(this.config.retryDelay);
        retries++;
      }
    }
    return false;
  }

  /**
   * Abstract method to be implemented by concrete providers
   * Handles the actual email sending logic
   * @param {EmailMessage} message - The email message to be sent
   * @returns {Promise<boolean>} True if the email was sent successfully
   * @abstract
   * @protected
   */
  protected abstract sendEmailRequest(message: EmailMessage): Promise<boolean>;

  public abstract isAvailable(): Promise<boolean>;

  /**
   * Validates all required fields and email addresses in the message
   * @param {EmailMessage} message - The email message to validate
   * @throws {Error} If any required fields are missing
   * @throws {InvalidEmailError} If any email address is invalid
   * @private
   */
  private validateMessage(message: EmailMessage): void {
    // Validate required fields
    const requiredFields: (keyof EmailMessage)[] = [
      "to",
      "from",
      "subject",
      "text",
    ];
    const missingFields = requiredFields.filter((field) => !message[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Validate email addresses
    this.validateEmail(message.from);
    this.validateEmails(message.to);
    if (message.cc) this.validateEmails(message.cc);
    if (message.bcc) this.validateEmails(message.bcc);
    if (message.replyTo) this.validateEmail(message.replyTo);
  }

  /**
   * Validates a list of email addresses
   * @param {string | string[]} emails - Single email address or array of addresses
   * @throws {InvalidEmailError} If any email address is invalid
   * @private
   */
  private validateEmails(emails: string | string[]): void {
    const emailList = Array.isArray(emails) ? emails : [emails];
    emailList.forEach(this.validateEmail.bind(this));
  }

  /**
   * Validates a single email address
   * @param {string} email - Email address to validate
   * @throws {InvalidEmailError} If the email address is invalid
   * @private
   */
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new InvalidEmailError(email);
    }
  }

  /**
   * Creates a delay promise for the retry mechanism
   * @param {number} ms - Number of milliseconds to delay
   * @returns {Promise<void>}
   * @private
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
