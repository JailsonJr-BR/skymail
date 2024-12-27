import { MailgunProvider } from "../../../providers/mailgun/mailgun-provider";
import { EmailMessage } from "../../../core/types/email-message";
import { MailgunConfig } from "../../../providers/mailgun/mailgun-config";

// Mock simples do Mailgun
const mockSend = jest.fn();
const mockGet = jest.fn();

jest.mock("mailgun.js", () => {
  return jest.fn().mockImplementation(() => ({
    client: (): {
      messages: { create: jest.Mock };
      domains: { get: jest.Mock };
    } => ({
      messages: { create: mockSend },
      domains: { get: mockGet },
    }),
  }));
});

describe("MailgunProvider", () => {
  let provider: MailgunProvider;
  let defaultConfig: MailgunConfig;
  let testMessage: EmailMessage;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    defaultConfig = {
      apiKey: "test-api-key",
      domain: "test.com",
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

    provider = new MailgunProvider(defaultConfig);
  });

  describe("constructor", () => {
    it("should throw error if no API key provided", () => {
      expect(
        () => new MailgunProvider({ ...defaultConfig, apiKey: "" }),
      ).toThrow("Mailgun API key is required");
    });

    it("should throw error if no domain provided", () => {
      expect(
        () => new MailgunProvider({ ...defaultConfig, domain: "" }),
      ).toThrow("Mailgun domain is required");
    });
  });

  describe("sendEmail", () => {
    it("should send email successfully", async () => {
      mockSend.mockResolvedValueOnce({ id: "123", message: "Queued" });

      const result = await provider.sendEmail(testMessage);

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        defaultConfig.domain,
        expect.objectContaining({
          to: [testMessage.to],
          from: testMessage.from,
          subject: testMessage.subject,
          text: testMessage.text,
          html: testMessage.html,
        }),
      );
    });

    it("should handle Mailgun error", async () => {
      mockSend.mockRejectedValueOnce(new Error("Mailgun error"));

      const result = await provider.sendEmail(testMessage);
      expect(result).toBe(false);
    });
  });

  describe("isAvailable", () => {
    it("should return true when Mailgun is available", async () => {
      mockGet.mockResolvedValueOnce({ domain: { state: "active" } });

      const result = await provider.isAvailable();
      expect(result).toBe(true);
    });

    it("should return false when Mailgun is not available", async () => {
      mockGet.mockRejectedValueOnce(new Error("API Error"));

      const result = await provider.isAvailable();
      expect(result).toBe(false);
    });
  });
});
