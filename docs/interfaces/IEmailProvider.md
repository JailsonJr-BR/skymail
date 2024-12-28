[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / IEmailProvider

# Interface: IEmailProvider

## Methods

### isAvailable()

> **isAvailable**(): `Promise`\<`boolean`\>

Checks if the email provider is currently available

#### Returns

`Promise`\<`boolean`\>

Promise<boolean> indicating if the provider is available

#### Defined in

src/core/interfaces/email-provider.ts:16

***

### sendEmail()

> **sendEmail**(`message`): `Promise`\<`boolean`\>

Sends an email message through the provider

#### Parameters

##### message

[`EmailMessage`](../type-aliases/EmailMessage.md)

The email message to send

#### Returns

`Promise`\<`boolean`\>

Promise<boolean> indicating if the message was sent successfully

#### Defined in

src/core/interfaces/email-provider.ts:9
