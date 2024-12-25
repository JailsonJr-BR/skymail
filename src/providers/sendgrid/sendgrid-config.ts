import { EmailProviderConfig } from "../abstract/abstract-email-provider";

/**
 * Configuration options for SendGrid provider
 * @interface SendGridConfig
 * @extends {EmailProviderConfig}
 */
export interface SendGridConfig extends EmailProviderConfig {
  /**
   * SendGrid API key
   */
  apiKey: string;
}
