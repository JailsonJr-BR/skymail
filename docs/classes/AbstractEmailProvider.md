[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / AbstractEmailProvider

# Class: `abstract` AbstractEmailProvider

Abstract base class for email providers
Implements common functionality like retry mechanism and validation

 AbstractEmailProvider

## Implements

## Extended by

- [`SendGridProvider`](SendGridProvider.md)
- [`MailgunProvider`](MailgunProvider.md)

## Implements

- [`IEmailProvider`](../interfaces/IEmailProvider.md)

## Constructors

### new AbstractEmailProvider()

> **new AbstractEmailProvider**(`config`): [`AbstractEmailProvider`](AbstractEmailProvider.md)

#### Parameters

##### config

`EmailProviderConfig` = `...`

#### Returns

[`AbstractEmailProvider`](AbstractEmailProvider.md)

#### Defined in

src/providers/abstract/abstract-email-provider.ts:24

## Properties

### config

> `protected` **config**: `EmailProviderConfig`

#### Defined in

src/providers/abstract/abstract-email-provider.ts:22

## Methods

### isAvailable()

> `abstract` **isAvailable**(): `Promise`\<`boolean`\>

Checks if the email provider is currently available

#### Returns

`Promise`\<`boolean`\>

Promise<boolean> indicating if the provider is available

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`isAvailable`](../interfaces/IEmailProvider.md#isavailable)

#### Defined in

src/providers/abstract/abstract-email-provider.ts:66

***

### sendEmail()

> **sendEmail**(`message`): `Promise`\<`boolean`\>

Sends an email with retry mechanism

#### Parameters

##### message

[`EmailMessage`](../type-aliases/EmailMessage.md)

The email message to be sent

#### Returns

`Promise`\<`boolean`\>

True if the email was sent successfully, false otherwise

#### Throws

If any email address is invalid

#### Throws

If required fields are missing

#### Implementation of

[`IEmailProvider`](../interfaces/IEmailProvider.md).[`sendEmail`](../interfaces/IEmailProvider.md#sendemail)

#### Defined in

src/providers/abstract/abstract-email-provider.ts:37

***

### sendEmailRequest()

> `abstract` `protected` **sendEmailRequest**(`message`): `Promise`\<`boolean`\>

Abstract method to be implemented by concrete providers
Handles the actual email sending logic

#### Parameters

##### message

[`EmailMessage`](../type-aliases/EmailMessage.md)

The email message to be sent

#### Returns

`Promise`\<`boolean`\>

True if the email was sent successfully

#### Defined in

src/providers/abstract/abstract-email-provider.ts:64
