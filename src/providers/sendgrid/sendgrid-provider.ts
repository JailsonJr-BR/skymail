import { AbstractEmailProvider } from "../abstract/abstract-email-provider.js";
import { EmailMessage } from "../../core/types/email-message.js";
import { SendGridConfig } from "./sendgrid-config.js";
import { Logger } from "../../utils/logger.js";
import sendgridMail from "@sendgrid/mail";
import { Client as SendGridClient } from "@sendgrid/client";

/**
 * SendGrid implementation of the email provider
 * @class SendGridProvider
 * @extends {AbstractEmailProvider}
 */
export class SendGridProvider extends AbstractEmailProvider {
  protected readonly config: SendGridConfig;
  private readonly client: SendGridClient;

  constructor(config: SendGridConfig) {
    super(config);

    if (!config.apiKey) {
      throw new Error("SendGrid API key is required");
    }

    this.config = config;
    sendgridMail.setApiKey(this.config.apiKey);

    this.client = new SendGridClient();
    this.client.setApiKey(this.config.apiKey);
  }

  protected async sendEmailRequest(message: EmailMessage): Promise<boolean> {
    try {
      const [response] = await sendgridMail.send({
        to: message.to,
        from: message.from,
        subject: message.subject,
        text: message.text,
        html: message.html,
        cc: message.cc,
        bcc: message.bcc,
        replyTo: message.replyTo,
        attachments: message.attachments?.map((attachment) => ({
          ...attachment,
          content:
            typeof attachment.content === "string"
              ? attachment.content
              : attachment.content.toString("base64"),
        })),
      });

      return response.statusCode === 202;
    } catch (error) {
      Logger.error("SendGrid error:", error);
      return false;
    }
  }

  /**
   * Checks if SendGrid service is available by making a test API call
   * @public
   * @returns {Promise<boolean>} True if service is available
   */
  public async isAvailable(): Promise<boolean> {
    try {
      const [response] = await this.client.request({
        method: "GET",
        url: "/v3/scopes",
      });
      return response.statusCode === 200;
    } catch (error) {
      Logger.error("SendGrid availability check failed:", error);
      return false;
    }
  }
}
