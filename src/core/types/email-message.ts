export type EmailMessage = {
  /**
   * Email address of the recipient
   */
  to: string | string[];

  /**
   * Email address of the sender
   */
  from: string;

  /**
   * Subject of the email
   */
  subject: string;

  /**
   * Plain text body of the email
   */
  text: string;

  /**
   * HTML body of the email
   */
  html: string;

  /**
   * Optional CC recipients
   */
  cc?: string | string[];

  /**
   * Optional BCC recipients
   */
  bcc?: string | string[];

  /**
   * Optional reply-to email address
   */
  replyTo?: string;

  /**
   * Optional attachments
   */
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
};
