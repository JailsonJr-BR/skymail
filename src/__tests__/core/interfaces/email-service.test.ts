import { IEmailService } from "../../../core/interfaces/email-service";
import { IEmailProvider } from "../../../core/interfaces/email-provider";
import { EmailMessage } from "../../../core/types/email-message";

// Mock provider para testes
class MockEmailProvider implements IEmailProvider {
  async sendEmail(): Promise<boolean> {
    return true;
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }
}

// Mock service para testes
class MockEmailService implements IEmailService {
  async sendEmail(): Promise<boolean> {
    return true;
  }

  addProvider(provider: IEmailProvider, priority: number): void {
    console.log(`Provider added with priority ${priority}`);
  }

  async getProvidersStatus(): Promise<
    Array<{ provider: IEmailProvider; available: boolean }>
  > {
    return [];
  }
}

describe("IEmailService Interface", () => {
  let service: IEmailService;
  let provider: IEmailProvider;
  let testMessage: EmailMessage;

  beforeEach(() => {
    service = new MockEmailService();
    provider = new MockEmailProvider();
    testMessage = {
      to: "test@example.com",
      from: "sender@example.com",
      subject: "Test Email",
      text: "Hello World",
      html: "<p>Hello World</p>",
    };
  });

  it("should have required methods", () => {
    expect(service.sendEmail).toBeDefined();
    expect(service.addProvider).toBeDefined();
    expect(service.getProvidersStatus).toBeDefined();
  });

  it("should send email successfully", async () => {
    const result = await service.sendEmail(testMessage);
    expect(result).toBe(true);
  });

  it("should add provider", () => {
    expect(() => service.addProvider(provider, 1)).not.toThrow();
  });

  it("should get providers status", async () => {
    const status = await service.getProvidersStatus();
    expect(Array.isArray(status)).toBe(true);
  });
});
