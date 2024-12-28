[**skymail v0.0.1**](../README.md)

***

[skymail](../globals.md) / EmailMessage

# Type Alias: EmailMessage

> **EmailMessage**: `object`

## Type declaration

### attachments?

> `optional` **attachments**: `object`[]

Optional attachments

### bcc?

> `optional` **bcc**: `string` \| `string`[]

Optional BCC recipients

### cc?

> `optional` **cc**: `string` \| `string`[]

Optional CC recipients

### from

> **from**: `string`

Email address of the sender

### html?

> `optional` **html**: `string`

HTML body of the email (optional)

### replyTo?

> `optional` **replyTo**: `string`

Optional reply-to email address

### subject

> **subject**: `string`

Subject of the email

### text

> **text**: `string`

Plain text body of the email

### to

> **to**: `string` \| `string`[]

Email address of the recipient

## Defined in

src/core/types/email-message.ts:1
