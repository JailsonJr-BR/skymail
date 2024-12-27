import { EmailMessage } from "../../core/types/email-message.js";
import { IEmailProvider } from "../../core/interfaces/email-provider.js";

/**
 * Interface for email service with failover capabilities
 * @interface IEmailService
 */
export interface IEmailService {
  /**
   * Sends an email using available providers with failover support
   * @param {EmailMessage} message - The email message to send
   * @returns {Promise<boolean>} True if sent successfully by any provider
   */
  sendEmail(message: EmailMessage): Promise<boolean>;

  /**
   * Adds a new provider to the service
   * @param {IEmailProvider} provider - The provider to add
   * @param {number} priority - Priority level (lower number = higher priority)
   */
  addProvider(provider: IEmailProvider, priority: number): void;

  /**
   * Gets the current status of all providers
   * @returns {Promise<Array<{ provider: IEmailProvider, available: boolean }>>}
   */
  getProvidersStatus(): Promise<
    Array<{ provider: IEmailProvider; available: boolean }>
  >;
}
