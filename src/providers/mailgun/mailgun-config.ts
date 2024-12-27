import { EmailProviderConfig } from "../abstract/abstract-email-provider.js";

/**
 * Configuration options for Mailgun provider
 * @interface MailgunConfig
 * @extends {EmailProviderConfig}
 */
export interface MailgunConfig extends EmailProviderConfig {
  /**
   * Mailgun API key
   */
  apiKey: string;

  /**
   * Mailgun domain
   */
  domain: string;

  /**
   * Optional Mailgun host (defaults to 'api.mailgun.net')
   */
  host?: string;

  /**
   * Optional endpoint version (defaults to 'v3')
   */
  version?: string;
}
