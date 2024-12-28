[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / SendGridProvider

# Class: SendGridProvider

SendGrid implementation of the email provider
 SendGridProvider

## Extends

- [`AbstractEmailProvider`](AbstractEmailProvider.md)

## Constructors

### new SendGridProvider()

> **new SendGridProvider**(`config`): [`SendGridProvider`](SendGridProvider.md)

#### Parameters

##### config

[`SendGridConfig`](../interfaces/SendGridConfig.md)

#### Returns

[`SendGridProvider`](SendGridProvider.md)

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`constructor`](AbstractEmailProvider.md#constructors)

#### Defined in

src/providers/sendgrid/sendgrid-provider.ts:17

## Properties

### config

> `protected` `readonly` **config**: [`SendGridConfig`](../interfaces/SendGridConfig.md)

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`config`](AbstractEmailProvider.md#config-1)

#### Defined in

src/providers/sendgrid/sendgrid-provider.ts:14

## Methods

### isAvailable()

> **isAvailable**(): `Promise`\<`boolean`\>

Checks if SendGrid service is available by making a test API call

#### Returns

`Promise`\<`boolean`\>

True if service is available

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`isAvailable`](AbstractEmailProvider.md#isavailable)

#### Defined in

src/providers/sendgrid/sendgrid-provider.ts:63

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

#### Inherited from

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`sendEmail`](AbstractEmailProvider.md#sendemail)

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

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`sendEmailRequest`](AbstractEmailProvider.md#sendemailrequest)

#### Defined in

src/providers/sendgrid/sendgrid-provider.ts:31
