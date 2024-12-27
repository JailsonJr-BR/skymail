import { AbstractEmailProvider } from "../abstract/abstract-email-provider.js";
import { EmailMessage } from "../../core/types/email-message.js";
import { MailgunConfig } from "./mailgun-config.js";
import { Logger } from "../../utils/logger.js";
import Mailgun from "mailgun.js";
import FormData from "form-data";

/**
 * Mailgun implementation of the email provider
 * @class MailgunProvider
 * @extends {AbstractEmailProvider}
 */
export class MailgunProvider extends AbstractEmailProvider {
  /**
   * Mailgun client instance
   * @private
   * @readonly
   * @type {ReturnType<typeof Mailgun.prototype.client>}
   */
  private readonly client: ReturnType<typeof Mailgun.prototype.client>;

  /**
   * Mailgun configuration
   * @protected
   * @readonly
   * @type {MailgunConfig}
   */
  protected readonly config: MailgunConfig;

  /**
   * Creates an instance of MailgunProvider
   * @param {MailgunConfig} config - Mailgun configuration
   * @throws {Error} When API key or domain is missing
   */
  constructor(config: MailgunConfig) {
    super(config);

    if (!config.apiKey) {
      throw new Error("Mailgun API key is required");
    }

    if (!config.domain) {
      throw new Error("Mailgun domain is required");
    }

    this.config = config;

    const mg = new Mailgun(FormData);
    this.client = mg.client({
      key: config.apiKey,
      username: "api",
    });
  }

  /**
   * Sends an email using Mailgun
   * @protected
   * @param {EmailMessage} message - Email message to send
   * @returns {Promise<boolean>} True if email was sent successfully
   */
  protected async sendEmailRequest(message: EmailMessage): Promise<boolean> {
    try {
      const messageData = {
        to: Array.isArray(message.to) ? message.to : [message.to],
        from: message.from,
        subject: message.subject,
        text: message.text,
        html: message.html,
        ...(message.cc && { cc: message.cc }),
        ...(message.bcc && { bcc: message.bcc }),
        ...(message.replyTo && { "h:Reply-To": message.replyTo }),
      };

      if (message.attachments?.length) {
        Object.assign(messageData, {
          attachment: message.attachments.map((att) => ({
            filename: att.filename,
            data: att.content,
            contentType: att.contentType,
          })),
        });
      }

      const result = await this.client.messages.create(
        this.config.domain,
        messageData,
      );
      return Boolean(result?.id);
    } catch (error) {
      Logger.error("Mailgun error:", error);
      return false;
    }
  }

  /**
   * Checks if Mailgun service is available
   * @public
   * @returns {Promise<boolean>} True if service is available
   */
  public async isAvailable(): Promise<boolean> {
    try {
      await this.client.domains.get(this.config.domain);
      return true;
    } catch (error) {
      Logger.error("Mailgun availability check failed:", error);
      return false;
    }
  }
}
