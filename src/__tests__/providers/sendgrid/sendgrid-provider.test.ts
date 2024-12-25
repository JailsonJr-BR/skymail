import { SendGridProvider } from "../../../providers/sendgrid/sendgrid-provider";
import { EmailMessage } from "../../../core/types/email-message";
import { SendGridConfig } from "../../../providers/sendgrid/sendgrid-config";

jest.mock("@sendgrid/mail", () => {
  return {
    setApiKey: jest.fn(),
    send: jest.fn(),
  };
});

// Import after mock
import { setApiKey, send } from "@sendgrid/mail";

/**
 * Test suite for SendGridProvider implementation
 */
describe("SendGridProvider", () => {
  let provider: SendGridProvider;
  let defaultConfig: SendGridConfig;
  let testMessage: EmailMessage;

  beforeEach(() => {
    jest.clearAllMocks();

    defaultConfig = {
      apiKey: "test-api-key",
      maxRetries: 3,
      retryDelay: 100,
    };

    testMessage = {
      to: "test@example.com",
      from: "sender@example.com",
      subject: "Test Email",
      text: "Hello World",
      html: "<p>Hello World</p>",
    };

    provider = new SendGridProvider(defaultConfig);
  });

  describe("constructor", () => {
    it("should initialize with config and set API key", () => {
      expect(setApiKey).toHaveBeenCalledWith("test-api-key");
    });

    it("should throw error if no API key provided", () => {
      expect(
        () => new SendGridProvider({ ...defaultConfig, apiKey: "" }),
      ).toThrow("SendGrid API key is required");
    });
  });

  describe("sendEmail", () => {
    it("should send email successfully", async () => {
      (send as jest.Mock).mockResolvedValueOnce([{ statusCode: 202 }, {}]);

      const result = await provider.sendEmail(testMessage);

      expect(result).toBe(true);
      expect(send).toHaveBeenCalledWith({
        to: testMessage.to,
        from: testMessage.from,
        subject: testMessage.subject,
        text: testMessage.text,
        html: testMessage.html,
      });
    });

    it("should handle SendGrid error", async () => {
      (send as jest.Mock).mockRejectedValueOnce(new Error("SendGrid error"));

      const result = await provider.sendEmail(testMessage);

      expect(result).toBe(false);
    });

    it("should handle attachments correctly", async () => {
      const messageWithAttachments = {
        ...testMessage,
        attachments: [
          {
            filename: "test.txt",
            content: "Hello World",
            contentType: "text/plain",
          },
        ],
      };

      (send as jest.Mock).mockResolvedValueOnce([{ statusCode: 202 }, {}]);

      await provider.sendEmail(messageWithAttachments);

      expect(send).toHaveBeenCalledWith(
        expect.objectContaining({
          attachments: messageWithAttachments.attachments,
        }),
      );
    });
  });

  describe("isAvailable", () => {
    it("should return true when SendGrid is available", async () => {
      const result = await provider.isAvailable();
      expect(result).toBe(true);
    });
  });
});
