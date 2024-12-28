**skymail v0.0.1**

***

# Skymail

[![Node.js CI](https://github.com/JailsonJr-BR/skymail/workflows/Node.js%20CI/badge.svg)](https://github.com/JailsonJr-BR/skymail/actions)
[![npm version](https://badge.fury.io/js/email-service-package.svg)](https://badge.fury.io/js/skymail)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A robust TypeScript email service package with automatic failover and multiple provider support. Built for reliability and ease of use in modern Node.js applications.

## Features

- **Automatic Failover**: Seamlessly switch between providers to ensure delivery
- **Multiple Provider Support**: 
  - SendGrid
  - Mailgun
  - Extensible architecture for custom providers
- **TypeScript First**: Full type safety and comprehensive definitions
- **Reliability Features**:
  - Priority-based provider selection
  - Automatic retry mechanism
  - Health monitoring
  - Configurable timeouts
- **Developer Experience**:
  - Clean, intuitive API
  - Comprehensive error handling
  - Detailed logging options

## Installation

```bash
npm install skymail
```

## Quick Start

```typescript
import { EmailService, SendGridProvider, MailgunProvider } from 'skymail';

// Initialize providers
const sendgrid = new SendGridProvider({
  apiKey: 'YOUR_SENDGRID_API_KEY',
  maxRetries: 3,
  retryDelay: 1000
});

const mailgun = new MailgunProvider({
  apiKey: 'YOUR_MAILGUN_API_KEY',
  domain: 'YOUR_DOMAIN',
  maxRetries: 3,
  retryDelay: 1000
});

// Create service with failover
const emailService = new EmailService([
  { provider: sendgrid, priority: 1 },  // Primary
  { provider: mailgun, priority: 2 }    // Backup
]);

// Send email
try {
  const success = await emailService.sendEmail({
    to: 'recipient@example.com',
    from: 'sender@yourdomain.com',
    subject: 'Hello!',
    text: 'Message content',
    html: '<p>Message content</p>'
  });

  console.log('Email sent:', success);
} catch (error) {
  console.error('Failed to send:', error);
}
```

## Architecture

The package follows a modular design with three main components:

1. **Email Service**: Orchestrates sending process and manages providers
2. **Providers**: Implement email sending logic for specific services
3. **Core Abstractions**: Define interfaces and base classes

![Architecture Diagram](docs/images/architecture.png)

## Provider Configuration

### SendGrid
```typescript
interface SendGridConfig {
  apiKey: string;          // Required
  maxRetries?: number;     // Optional (default: 3)
  retryDelay?: number;     // Optional (default: 1000ms)
}
```

### Mailgun
```typescript
interface MailgunConfig {
  apiKey: string;         // Required
  domain: string;         // Required
  maxRetries?: number;    // Optional (default: 3)
  retryDelay?: number;    // Optional (default: 1000ms)
}
```

## Email Message Options

```typescript
interface EmailMessage {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}
```

## Advanced Usage

### Custom Provider

```typescript
import { AbstractEmailProvider, EmailMessage } from 'skymail';

export class CustomProvider extends AbstractEmailProvider {
  constructor(config: YourConfig) {
    super(config);
  }

  protected async sendEmailRequest(message: EmailMessage): Promise<boolean> {
    // Implement provider-specific sending logic
    return true;
  }

  public async isAvailable(): Promise<boolean> {
    // Implement availability check
    return true;
  }
}
```

### Provider Management

```typescript
// Add new provider
emailService.addProvider(newProvider, 3);

// Remove provider
emailService.removeProvider(existingProvider);

// Update priority
emailService.updatePriority(existingProvider, 2);

// Check status
const status = await emailService.getProvidersStatus();
```

## Error Handling

```typescript
try {
  const result = await emailService.sendEmail(message);
  if (!result) {
    // All providers failed
  }
} catch (error) {
  if (error instanceof InvalidEmailError) {
    // Handle validation errors
  } else {
    // Handle other errors
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](_media/LICENSE) file for details.

## Support

- Issues: [GitHub Issues](https://github.com/JailsonJr-BR/skymail/issues)
- Documentation: [Full Documentation](https://github.com/JailsonJr-BR/skymail/docs)
