import { EmailService } from "../../services/email-service";
import { IEmailProvider } from "../../core/interfaces/email-provider";
import { EmailMessage } from "../../core/types/email-message";

class MockProvider implements IEmailProvider {
  constructor(
    private shouldSucceed: boolean = true,
    private isAvailableValue: boolean = true,
  ) {}

  async sendEmail(): Promise<boolean> {
    return this.shouldSucceed;
  }

  async isAvailable(): Promise<boolean> {
    return this.isAvailableValue;
  }
}

describe("EmailService", () => {
  let service: EmailService;
  let testMessage: EmailMessage;

  beforeEach(() => {
    service = new EmailService();
    testMessage = {
      to: "test@example.com",
      from: "sender@example.com",
      subject: "Test",
      text: "Test message",
      html: "<p>Test message</p>",
    };
  });

  describe("basic functionality", () => {
    it("should throw error when no providers are configured", async () => {
      await expect(service.sendEmail(testMessage)).rejects.toThrow(
        "No email providers configured",
      );
    });

    it("should add providers with priority", () => {
      const provider1 = new MockProvider();
      const provider2 = new MockProvider();

      service.addProvider(provider1, 2);
      service.addProvider(provider2, 1);

      const providers = service.getProviders();
      expect(providers).toHaveLength(2);
      expect(providers[0].priority).toBe(1);
      expect(providers[1].priority).toBe(2);
    });
  });

  describe("failover functionality", () => {
    it("should try next provider when first one fails", async () => {
      const failingProvider = new MockProvider(false);
      const successProvider = new MockProvider(true);

      service.addProvider(failingProvider, 1);
      service.addProvider(successProvider, 2);

      const result = await service.sendEmail(testMessage);
      expect(result).toBe(true);
    });

    it("should return false when all providers fail", async () => {
      const failingProvider1 = new MockProvider(false);
      const failingProvider2 = new MockProvider(false);

      service.addProvider(failingProvider1, 1);
      service.addProvider(failingProvider2, 2);

      const result = await service.sendEmail(testMessage);
      expect(result).toBe(false);
    });

    it("should skip unavailable providers", async () => {
      const unavailableProvider = new MockProvider(true, false);
      const availableProvider = new MockProvider(true, true);

      service.addProvider(unavailableProvider, 1);
      service.addProvider(availableProvider, 2);

      const result = await service.sendEmail(testMessage);
      expect(result).toBe(true);
    });
  });

  describe("provider management", () => {
    it("should get providers status correctly", async () => {
      const provider1 = new MockProvider(true, true);
      const provider2 = new MockProvider(true, false);

      service.addProvider(provider1, 1);
      service.addProvider(provider2, 2);

      const status = await service.getProvidersStatus();
      expect(status).toHaveLength(2);
      expect(status[0].available).toBe(true);
      expect(status[1].available).toBe(false);
    });

    it("should remove provider correctly", () => {
      const provider1 = new MockProvider();
      const provider2 = new MockProvider();

      service.addProvider(provider1, 1);
      service.addProvider(provider2, 2);
      service.removeProvider(provider1);

      const providers = service.getProviders();
      expect(providers).toHaveLength(1);
      expect(providers[0].provider).toBe(provider2);
    });

    it("should update provider priority", () => {
      const provider1 = new MockProvider();
      const provider2 = new MockProvider();

      service.addProvider(provider1, 2);
      service.addProvider(provider2, 1);
      service.updatePriority(provider1, 0);

      const providers = service.getProviders();
      expect(providers[0].provider).toBe(provider1);
      expect(providers[0].priority).toBe(0);
    });
  });
});
