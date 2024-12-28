[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / EmailService

# Class: EmailService

Email service implementation with failover support
 EmailService

## Implements

## Implements

- [`IEmailService`](../interfaces/IEmailService.md)

## Constructors

### new EmailService()

> **new EmailService**(`initialProviders`?): [`EmailService`](EmailService.md)

Creates an instance of EmailService

#### Parameters

##### initialProviders?

`object`[]

Initial providers with priorities

#### Returns

[`EmailService`](EmailService.md)

#### Defined in

src/services/email-service.ts:33

## Methods

### addProvider()

> **addProvider**(`provider`, `priority`): `void`

Adds a new email provider to the service

#### Parameters

##### provider

[`IEmailProvider`](../interfaces/IEmailProvider.md)

The provider to add

##### priority

`number`

Priority level (lower number = higher priority)

#### Returns

`void`

#### Implementation of

[`IEmailService`](../interfaces/IEmailService.md).[`addProvider`](../interfaces/IEmailService.md#addprovider)

#### Defined in

src/services/email-service.ts:49

***

### getProviders()

> **getProviders**(): `ProviderEntry`[]

Gets a copy of the current providers array

#### Returns

`ProviderEntry`[]

Array of provider entries

#### Defined in

src/services/email-service.ts:119

***

### getProvidersStatus()

> **getProvidersStatus**(): `Promise`\<`object`[]\>

Gets the current status of all providers

#### Returns

`Promise`\<`object`[]\>

Array of provider status

#### Implementation of

[`IEmailService`](../interfaces/IEmailService.md).[`getProvidersStatus`](../interfaces/IEmailService.md#getprovidersstatus)

#### Defined in

src/services/email-service.ts:101

***

### removeProvider()

> **removeProvider**(`providerToRemove`): `void`

Removes a provider from the service

#### Parameters

##### providerToRemove

[`IEmailProvider`](../interfaces/IEmailProvider.md)

The provider to remove

#### Returns

`void`

#### Defined in

src/services/email-service.ts:128

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

#### Throws

When no email providers are configured

#### Implementation of

[`IEmailService`](../interfaces/IEmailService.md).[`sendEmail`](../interfaces/IEmailService.md#sendemail)

#### Defined in

src/services/email-service.ts:61

***

### updatePriority()

> **updatePriority**(`provider`, `newPriority`): `void`

Updates the priority of an existing provider

#### Parameters

##### provider

[`IEmailProvider`](../interfaces/IEmailProvider.md)

The provider to update

##### newPriority

`number`

New priority level

#### Returns

`void`

#### Defined in

src/services/email-service.ts:140
