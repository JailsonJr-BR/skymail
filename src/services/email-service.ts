import { EmailMessage } from "../core/types/email-message.js";
import { IEmailProvider } from "../core/interfaces/email-provider.js";
import { IEmailService } from "../core/interfaces/email-service.js";

/**
 * Represents an email provider entry with its priority
 * @typedef {Object} ProviderEntry
 * @property {IEmailProvider} provider - The email provider instance
 * @property {number} priority - Provider's priority (lower number = higher priority)
 */
type ProviderEntry = {
  provider: IEmailProvider;
  priority: number;
};

/**
 * Email service implementation with failover support
 * @class EmailService
 * @implements {IEmailService}
 */
export class EmailService implements IEmailService {
  /**
   * Array of email providers with their priorities
   * @private
   * @type {ProviderEntry[]}
   */
  private providers: ProviderEntry[] = [];

  /**
   * Creates an instance of EmailService
   * @param {Array<{provider: IEmailProvider, priority: number}>} [initialProviders] - Initial providers with priorities
   */
  constructor(
    initialProviders?: Array<{ provider: IEmailProvider; priority: number }>,
  ) {
    if (initialProviders) {
      initialProviders.forEach(({ provider, priority }) => {
        this.addProvider(provider, priority);
      });
    }
  }

  /**
   * Adds a new email provider to the service
   * @public
   * @param {IEmailProvider} provider - The provider to add
   * @param {number} priority - Priority level (lower number = higher priority)
   */
  public addProvider(provider: IEmailProvider, priority: number): void {
    this.providers.push({ provider, priority });
    this.providers.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Sends an email using available providers with failover support
   * @public
   * @param {EmailMessage} message - The email message to send
   * @returns {Promise<boolean>} True if sent successfully by any provider
   * @throws {Error} When no email providers are configured
   */
  public async sendEmail(message: EmailMessage): Promise<boolean> {
    if (this.providers.length === 0) {
      throw new Error("No email providers configured");
    }

    // Try each provider in priority order
    for (let i = 0; i < this.providers.length; i++) {
      const { provider } = this.providers[i];
      const providerName = provider.constructor.name;

      try {
        console.log(`Attempting to send with ${providerName}...`);
        const available = await provider.isAvailable();

        if (!available) {
          console.log(`${providerName} is not available, trying next...`);
          continue;
        }

        const success = await provider.sendEmail(message);
        if (success) {
          console.log(`Email sent successfully using ${providerName}!`);
          return true;
        } else {
          console.log(`${providerName} failed to send, trying next...`);
        }
      } catch (error) {
        console.log(`Error sending with ${providerName}:`, error);
        continue;
      }
    }

    return false;
  }

  /**
   * Gets the current status of all providers
   * @public
   * @returns {Promise<Array<{provider: IEmailProvider, available: boolean}>>} Array of provider status
   */
  public async getProvidersStatus(): Promise<
    Array<{ provider: IEmailProvider; available: boolean }>
  > {
    const statuses = await Promise.all(
      this.providers.map(async ({ provider }) => ({
        provider,
        available: await provider.isAvailable(),
      })),
    );

    return statuses;
  }

  /**
   * Gets a copy of the current providers array
   * @public
   * @returns {ProviderEntry[]} Array of provider entries
   */
  public getProviders(): ProviderEntry[] {
    return [...this.providers];
  }

  /**
   * Removes a provider from the service
   * @public
   * @param {IEmailProvider} providerToRemove - The provider to remove
   */
  public removeProvider(providerToRemove: IEmailProvider): void {
    this.providers = this.providers.filter(
      ({ provider }) => provider !== providerToRemove,
    );
  }

  /**
   * Updates the priority of an existing provider
   * @public
   * @param {IEmailProvider} provider - The provider to update
   * @param {number} newPriority - New priority level
   */
  public updatePriority(provider: IEmailProvider, newPriority: number): void {
    const index = this.providers.findIndex((p) => p.provider === provider);
    if (index !== -1) {
      this.providers[index].priority = newPriority;
      this.providers.sort((a, b) => a.priority - b.priority);
    }
  }
}
