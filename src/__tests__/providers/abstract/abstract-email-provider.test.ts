import { AbstractEmailProvider } from "../../../providers/abstract/abstract-email-provider";
import { EmailMessage } from "../../../core/types/email-message";
import { InvalidEmailError } from "../../../core/errors/invalid-email-error";

/**
 * Concrete implementation of AbstractEmailProvider for testing purposes
 * @class TestEmailProvider
 * @extends {AbstractEmailProvider}
 */
class TestEmailProvider extends AbstractEmailProvider {
  constructor(
    private shouldFail: boolean = false,
    private failureCount: number = 0,
  ) {
    super({
      maxRetries: 3,
      retryDelay: 100,
    });
  }

  protected async sendEmailRequest(): Promise<boolean> {
    if (this.shouldFail) {
      if (this.failureCount > 0) {
        this.failureCount--;
        throw new Error("Simulated failure");
      }
    }
    return true;
  }

  public async isAvailable(): Promise<boolean> {
    return !this.shouldFail || this.failureCount === 0;
  }
}

describe("AbstractEmailProvider", () => {
  let message: EmailMessage;

  beforeEach(() => {
    message = {
      to: "test@example.com",
      from: "sender@example.com",
      subject: "Test Email",
      text: "Hello World",
    };
  });

  it("should send email successfully", async () => {
    const provider = new TestEmailProvider();
    const result = await provider.sendEmail(message);
    expect(result).toBe(true);
  });

  it("should retry on failure and eventually succeed", async () => {
    const provider = new TestEmailProvider(true, 2); // Fail twice then succeed
    const result = await provider.sendEmail(message);
    expect(result).toBe(true);
  });

  it("should fail after max retries", async () => {
    const provider = new TestEmailProvider(true, 4); // Fail more than max retries
    const result = await provider.sendEmail(message);
    expect(result).toBe(false);
  });

  it("should validate email addresses", async () => {
    const provider = new TestEmailProvider();
    const invalidMessage = { ...message, to: "invalid-email" };

    await expect(provider.sendEmail(invalidMessage)).rejects.toThrow(
      InvalidEmailError,
    );
  });

  it("should validate email message fields", async () => {
    const provider = new TestEmailProvider();
    const invalidMessage = {
      to: "test@example.com",
      from: "sender@example.com",
    } as EmailMessage;

    await expect(provider.sendEmail(invalidMessage)).rejects.toThrow(
      "Missing required fields: subject, text",
    );
  });
});
