/**
 * Email Service Package
 * @module email-service-package
 */

export type { EmailMessage } from "./core/types/email-message.js";
export type { IEmailProvider } from "./core/interfaces/email-provider.js";
export type { IEmailService } from "./core/interfaces/email-service.js";
export { EmailService } from "./services/email-service.js";
export { InvalidEmailError } from "./core/errors/invalid-email-error.js";
export { AbstractEmailProvider } from "./providers/abstract/abstract-email-provider.js";
export { SendGridProvider } from "./providers/sendgrid/sendgrid-provider.js";
export { MailgunProvider } from "./providers/mailgun/mailgun-provider.js";
export type { MailgunConfig } from "./providers/mailgun/mailgun-config.js";
export type { SendGridConfig } from "./providers/sendgrid/sendgrid-config.js";
