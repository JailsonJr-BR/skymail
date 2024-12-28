[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / MailgunProvider

# Class: MailgunProvider

Mailgun implementation of the email provider
 MailgunProvider

## Extends

- [`AbstractEmailProvider`](AbstractEmailProvider.md)

## Constructors

### new MailgunProvider()

> **new MailgunProvider**(`config`): [`MailgunProvider`](MailgunProvider.md)

Creates an instance of MailgunProvider

#### Parameters

##### config

[`MailgunConfig`](../interfaces/MailgunConfig.md)

Mailgun configuration

#### Returns

[`MailgunProvider`](MailgunProvider.md)

#### Throws

When API key or domain is missing

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`constructor`](AbstractEmailProvider.md#constructors)

#### Defined in

src/providers/mailgun/mailgun-provider.ts:35

## Properties

### config

> `protected` `readonly` **config**: [`MailgunConfig`](../interfaces/MailgunConfig.md)

Mailgun configuration

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`config`](AbstractEmailProvider.md#config-1)

#### Defined in

src/providers/mailgun/mailgun-provider.ts:28

## Methods

### isAvailable()

> **isAvailable**(): `Promise`\<`boolean`\>

Checks if Mailgun service is available

#### Returns

`Promise`\<`boolean`\>

True if service is available

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`isAvailable`](AbstractEmailProvider.md#isavailable)

#### Defined in

src/providers/mailgun/mailgun-provider.ts:100

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

> `protected` **sendEmailRequest**(`message`): `Promise`\<`boolean`\>

Sends an email using Mailgun

#### Parameters

##### message

[`EmailMessage`](../type-aliases/EmailMessage.md)

Email message to send

#### Returns

`Promise`\<`boolean`\>

True if email was sent successfully

#### Overrides

[`AbstractEmailProvider`](AbstractEmailProvider.md).[`sendEmailRequest`](AbstractEmailProvider.md#sendemailrequest)

#### Defined in

src/providers/mailgun/mailgun-provider.ts:61
