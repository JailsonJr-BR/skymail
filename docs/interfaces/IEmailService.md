[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / IEmailService

# Interface: IEmailService

Interface for email service with failover capabilities
 IEmailService

## Methods

### addProvider()

> **addProvider**(`provider`, `priority`): `void`

Adds a new provider to the service

#### Parameters

##### provider

[`IEmailProvider`](IEmailProvider.md)

The provider to add

##### priority

`number`

Priority level (lower number = higher priority)

#### Returns

`void`

#### Defined in

src/core/interfaces/email-service.ts:21

***

### getProvidersStatus()

> **getProvidersStatus**(): `Promise`\<`object`[]\>

Gets the current status of all providers

#### Returns

`Promise`\<`object`[]\>

#### Defined in

src/core/interfaces/email-service.ts:27

***

### sendEmail()

> **sendEmail**(`message`): `Promise`\<`boolean`\>

Sends an email using available providers with failover support

#### Parameters

##### message

[`EmailMessage`](../type-aliases/EmailMessage.md)

The email message to send

#### Returns

`Promise`\<`boolean`\>

True if sent successfully by any provider

#### Defined in

src/core/interfaces/email-service.ts:14
