import { IEmailProvider } from "../../../core/interfaces/email-provider";
import { EmailMessage } from "../../../core/types/email-message";

class MockEmailProvider implements IEmailProvider {
  async sendEmail(): Promise<boolean> {
    return true;
  }

  isAvailable(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe("EmailProvider Interface", () => {
  let provider: IEmailProvider;

  beforeEach(() => {
    provider = new MockEmailProvider();
  });

  it("should have required methods", () => {
    expect(provider.sendEmail).toBeDefined();
    expect(provider.isAvailable).toBeDefined();
  });

  it("should send email sucessfully", async () => {
    const message: EmailMessage = {
      to: "test@example.com",
      from: "sender@example.com",
      subject: "Test Email",
      text: "Hello World",
      html: "<p>Hello World</p>",
    };

    const result = await provider.sendEmail(message);
    expect(result).toBe(true);
  });

  it("should check availability", async () => {
    const result = await provider.isAvailable();
    expect(result).toBe(true);
  });
});
