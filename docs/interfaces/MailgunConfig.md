[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / MailgunConfig

# Interface: MailgunConfig

Configuration options for Mailgun provider
 MailgunConfig

## Extends

- `EmailProviderConfig`

## Properties

### apiKey

> **apiKey**: `string`

Mailgun API key

#### Defined in

src/providers/mailgun/mailgun-config.ts:12

***

### domain

> **domain**: `string`

Mailgun domain

#### Defined in

src/providers/mailgun/mailgun-config.ts:17

***

### host?

> `optional` **host**: `string`

Optional Mailgun host (defaults to 'api.mailgun.net')

#### Defined in

src/providers/mailgun/mailgun-config.ts:22

***

### maxRetries

> **maxRetries**: `number`

#### Inherited from

`EmailProviderConfig.maxRetries`

#### Defined in

src/providers/abstract/abstract-email-provider.ts:10

***

### retryDelay

> **retryDelay**: `number`

#### Inherited from

`EmailProviderConfig.retryDelay`

#### Defined in

src/providers/abstract/abstract-email-provider.ts:11

***

### version?

> `optional` **version**: `string`

Optional endpoint version (defaults to 'v3')

#### Defined in

src/providers/mailgun/mailgun-config.ts:27
