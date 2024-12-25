import { EmailMessage } from "../types/email-message";

export interface IEmailProvider {
  /**
   * Sends an email message through the provider
   * @param message The email message to send
   * @returns Promise<boolean> indicating if the message was sent successfully
   */
  sendEmail(message: EmailMessage): Promise<boolean>;

  /**
   * Checks if the email provider is currently available
   * @returns Promise<boolean> indicating if the provider is available
   */

  isAvailable(): Promise<boolean>;
}
