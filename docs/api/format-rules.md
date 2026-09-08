# Format Rules

Format rules validate that a string conforms to a well-known format - emails, URLs, IDs, addresses, and similar. Most are thin wrappers around the [`@browsery/validator`](https://www.npmjs.com/package/@browsery/validator) package.

## isAlpha

Validates that a string contains only letters (`a-zA-Z`).

**Availability:** Pre-built (`import { isAlpha } from 'valgen'`).

**Signature**
```ts
isAlpha(options?: isAlpha.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isAlpha(input)`. Non-string input fails.

**Example**
```ts
import { isAlpha } from 'valgen';

isAlpha('abcDEF'); // => 'abcDEF'
isAlpha('abc123'); // throws ValidationError: "Value must be an alpha string"
isAlpha.silent('abc123'); // => { errors: [...] }
```

## isAlphanumeric

Validates that a string contains only letters and numbers.

**Availability:** Pre-built (`import { isAlphanumeric } from 'valgen'`).

**Signature**
```ts
isAlphanumeric(options?: isAlphanumeric.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isAlphanumeric(input)`. Non-string input fails.

**Example**
```ts
import { isAlphanumeric } from 'valgen';

isAlphanumeric('abc123'); // => 'abc123'
isAlphanumeric('abc-123'); // throws ValidationError: "Value must be an alphanumeric string"
isAlphanumeric.silent('abc-123'); // => { errors: [...] }
```

## isAscii

Validates that a string contains only ASCII characters.

**Availability:** Pre-built (`import { isAscii } from 'valgen'`).

**Signature**
```ts
isAscii(options?: isAscii.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isAscii(input)`. Non-ASCII characters (e.g. accented or non-Latin letters) fail.

**Example**
```ts
import { isAscii } from 'valgen';

isAscii('abc123!@#'); // => 'abc123!@#'
isAscii('şiir'); // throws ValidationError: "Value must be an ascii string"
isAscii.silent('şiir'); // => { errors: [...] }
```

## isBase64

Validates that a string is Base64-encoded.

**Availability:** Pre-built (`import { isBase64 } from 'valgen'`).

**Signature**
```ts
isBase64(options?: isBase64.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `urlSafe` | `boolean` | `false` | If `true`, expects URL-safe Base64 (`-`/`_` instead of `+`/`/`). |
| `padding` | `boolean` | `!urlSafe` | Whether trailing `=` padding is required. |

**Behavior**
- Delegates to `validatorJS.isBase64(input, options)`.

**Example**
```ts
import { isBase64 } from 'valgen';

isBase64('SGVsbG8gV29ybGQ='); // => 'SGVsbG8gV29ybGQ='
isBase64('not-base64!!'); // throws ValidationError: "Value must be a Base64 string"
isBase64.silent('not-base64!!'); // => { errors: [...] }
```

## isBtcAddress

Validates that a string is a valid Bitcoin (BTC) address.

**Availability:** Pre-built (`import { isBtcAddress } from 'valgen'`).

**Signature**
```ts
isBtcAddress(options?: isBtcAddress.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isBtcAddress(input)`.

**Example**
```ts
import { isBtcAddress } from 'valgen';

isBtcAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'); // => '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
isBtcAddress('notabtcaddress'); // throws ValidationError: "Value must be a valid BTC address"
isBtcAddress.silent('notabtcaddress'); // => { errors: [...] }
```

## isCreditCard

Validates that a string is a valid credit card number.

**Availability:** Pre-built (`import { isCreditCard } from 'valgen'`).

**Signature**
```ts
isCreditCard(options?: isCreditCard.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `provider` | `'amex' \| 'dinersclub' \| 'discover' \| 'jcb' \| 'mastercard' \| 'unionpay' \| 'visa' \| ''` | `undefined` | Restricts validation to a specific card provider/network. |

**Behavior**
- Delegates to `validatorJS.isCreditCard(input, options)` (Luhn checksum plus provider-specific pattern).

**Example**
```ts
import { isCreditCard, vg } from 'valgen';

isCreditCard('4111111111111111'); // => '4111111111111111'
isCreditCard('4111111111111112'); // throws ValidationError: "Value must be a valid Credit Card number"
isCreditCard.silent('4111111111111112'); // => { errors: [...] }

const isVisaCard = vg.isCreditCard({ provider: 'visa' });
isVisaCard('4111111111111111'); // => '4111111111111111'
```

## isDecimal

Validates that a string represents a decimal number (e.g. `0.1`, `.3`, `1.00003`, `4.0`).

**Availability:** Pre-built (`import { isDecimal } from 'valgen'`).

**Signature**
```ts
isDecimal(options?: isDecimal.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isDecimal(input)` with no options passed through, so it always uses the underlying library's default rules.

**Example**
```ts
import { isDecimal } from 'valgen';

isDecimal('1.5'); // => '1.5'
isDecimal('abc'); // throws ValidationError: "Value must be a decimal number string"
isDecimal.silent('abc'); // => { errors: [...] }
```

## isEAN

Validates that a string is a valid EAN (European Article Number).

**Availability:** Pre-built (`import { isEAN } from 'valgen'`).

**Signature**
```ts
isEAN(options?: isEAN.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isEAN(input)` (checksum-validated EAN-8/EAN-13 style codes).

**Example**
```ts
import { isEAN } from 'valgen';

isEAN('4006381333931'); // => '4006381333931'
isEAN('1234567890123'); // throws ValidationError: "Value must be a valid EAN (European Article Number)"
isEAN.silent('1234567890123'); // => { errors: [...] }
```

## isEmail

Validates that a string is a well-formed email address.

**Availability:** Pre-built (`import { isEmail } from 'valgen'`).

**Signature**
```ts
isEmail(options?: isEmail.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `allowDisplayName` | `boolean` | `false` | Also match `Display Name <email-address>`. |
| `requireDisplayName` | `boolean` | `false` | Reject strings that are not in `Display Name <email-address>` form. |
| `utf8LocalPart` | `boolean` | `true` | If `false`, disallows non-English UTF-8 characters in the local part. |
| `ignoreMaxLength` | `boolean` | `false` | Skip the standard max-length check. |
| `allowIpDomain` | `boolean` | `false` | Allow IP addresses as the domain part. |
| `domainSpecificValidation` | `boolean` | `false` | Enable extra checks (e.g. rules Gmail enforces beyond RFC syntax). |
| `hostBlacklist` | `string[]` | `undefined` | Reject if the domain matches one of these strings. |
| `hostWhitelist` | `string[]` | `undefined` | Reject unless the domain matches one of these strings. |
| `blacklistedChars` | `string` | `undefined` | Reject if the local part contains any of these characters. |

**Behavior**
- Wraps `validatorJS.isEmail`, always passing `allow_display_name: true` as a base, then layers additional checks (display name requirement/prohibition, host black/white list, blacklisted characters) as separate re-validation passes, each producing a specific error message.

**Example**
```ts
import { isEmail } from 'valgen';

isEmail('me@domain.com'); // => 'me@domain.com'
isEmail('invalid'); // throws ValidationError: "Value must match required e-mail format"
isEmail.silent('invalid'); // => { errors: [...] }
```

## isETHAddress

Validates that a string is a valid Ethereum (ETH) address.

**Availability:** Pre-built (`import { isETHAddress } from 'valgen'`).

**Signature**
```ts
isETHAddress(options?: isETHAddress.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isEthereumAddress(input)`.

**Example**
```ts
import { isETHAddress } from 'valgen';

isETHAddress('0xb794f5ea0ba39494ce839613fffba74279579268'); // => '0xb794f5ea0ba39494ce839613fffba74279579268'
isETHAddress('0xnothex'); // throws ValidationError: "Value must be valid ETH (Ethereum) address"
isETHAddress.silent('0xnothex'); // => { errors: [...] }
```

## isFQDN

Validates that a string is a fully qualified domain name (e.g. `domain.com`).

**Availability:** Pre-built (`import { isFQDN } from 'valgen'`).

**Signature**
```ts
isFQDN(options?: isFQDN.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `allowWildcard` | `boolean` | `false` | Allow domains starting with `*.` (e.g. `*.example.com`). |

**Behavior**
- Delegates to `validatorJS.isFQDN(input, { allow_wildcard })`. Only `allowWildcard` is forwarded; other underlying options (`require_tld`, `allow_underscores`, etc.) are not currently exposed.

**Example**
```ts
import { isFQDN, vg } from 'valgen';

isFQDN('example.com'); // => 'example.com'
isFQDN('*.example.com'); // throws ValidationError: "Value must be valid FQDN" (wildcard rejected by default)
isFQDN.silent('not a domain'); // => { errors: [...] }

const allowWildcard = vg.isFQDN({ allowWildcard: true });
allowWildcard('*.example.com'); // => '*.example.com'
```

## isHash

Validates that a string is a hash digest of the given algorithm.

**Availability:** Factory only (`vg.isHash(algorithm, options?)`).

**Signature**
```ts
isHash(algorithm: isHash.HashAlgorithm, options?: ValidationOptions): Validator<string, string>
```
`HashAlgorithm` is one of: `'md4' | 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'ripemd128' | 'ripemd160' | 'tiger128' | 'tiger160' | 'tiger192' | 'crc32' | 'crc32b'`.

**Behavior**
- Delegates to `validatorJS.isHash(input, algorithm)`, which checks that the string is a hex string of the length expected for the given algorithm.

**Example**
```ts
import { vg } from 'valgen';

const isMd5 = vg.isHash('md5');
isMd5('5d41402abc4b2a76b9719d911017c592'); // => '5d41402abc4b2a76b9719d911017c592'
isMd5('too-short'); // throws ValidationError: "Value must be a valid md5 hash"
isMd5.silent('too-short'); // => { errors: [...] }
```

## isHex

Validates that a string is a hexadecimal number.

**Availability:** Pre-built (`import { isHex } from 'valgen'`).

**Signature**
```ts
isHex(options?: isHex.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isHexadecimal(input)`.

**Example**
```ts
import { isHex } from 'valgen';

isHex('1a2B3c'); // => '1a2B3c'
isHex('zzz'); // throws ValidationError: "Value must be an hexadecimal string"
isHex.silent('zzz'); // => { errors: [...] }
```

## isHexColor

Validates that a string is a valid hexadecimal color (e.g. `#fff`, `#ffffff`).

**Availability:** Pre-built (`import { isHexColor } from 'valgen'`).

**Signature**
```ts
isHexColor(options?: isHexColor.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isHexColor(input)`.

**Example**
```ts
import { isHexColor } from 'valgen';

isHexColor('#fff'); // => '#fff'
isHexColor('notacolor'); // throws ValidationError: "Value must be a valid Hex Color"
isHexColor.silent('notacolor'); // => { errors: [...] }
```

## isIBAN

Validates that a string is a valid IBAN (International Bank Account Number).

**Availability:** Pre-built (`import { isIBAN } from 'valgen'`).

**Signature**
```ts
isIBAN(options?: isIBAN.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `whitelist` | `IBANLocale[]` | `undefined` | Only accept IBANs from these country codes. |
| `blacklist` | `IBANLocale[]` | `undefined` | Reject IBANs from these country codes. |

**Behavior**
- Delegates to `validatorJS.isIBAN(input, options)`, which checks structure and the mod-97 checksum for the country.

**Example**
```ts
import { isIBAN, vg } from 'valgen';

isIBAN('DE89370400440532013000'); // => 'DE89370400440532013000'
isIBAN('DE89370400440532013001'); // throws ValidationError: "Value must be a valid IBAN (International Bank Account Number)"
isIBAN.silent('DE89370400440532013001'); // => { errors: [...] }

const deOnly = vg.isIBAN({ whitelist: ['DE'] });
deOnly('DE89370400440532013000'); // => 'DE89370400440532013000'
```

## isIP

Validates that a string is a valid IP address (v4 or v6).

**Availability:** Pre-built (`import { isIP } from 'valgen'`); the versioned form is factory only (`vg.isIP(version)`).

**Signature**
```ts
isIP(version?: isIP.IPVersion, options?: ValidationOptions): Validator<string, string>
```
`IPVersion` is `'4' | '6' | 4 | 6`.

**Behavior**
- Delegates to `validatorJS.isIP(input, version)`. Without a version, either IPv4 or IPv6 is accepted; with a version, only that version passes.

**Example**
```ts
import { isIP, vg } from 'valgen';

isIP('192.168.1.1'); // => '192.168.1.1'
isIP('not-an-ip'); // throws ValidationError: "Value must be a valid IP"
isIP.silent('not-an-ip'); // => { errors: [...] }

const isIPv4 = vg.isIP(4);
isIPv4('10.0.0.1'); // => '10.0.0.1'
isIPv4('2001:db8::1'); // throws ValidationError: "Value must be a valid IP v4"
```

## isIPRange

Validates that a string is a valid IP address range in CIDR notation (v4 or v6).

**Availability:** Pre-built (`import { isIPRange } from 'valgen'`); the versioned form is factory only (`vg.isIPRange(version)`).

**Signature**
```ts
isIPRange(version?: isIPRange.IPVersion, options?: ValidationOptions): Validator<string, string>
```
`IPVersion` is `'4' | '6' | 4 | 6`.

**Behavior**
- Delegates to `validatorJS.isIPRange(input, version)`, requiring a `/`-delimited subnet mask.

**Example**
```ts
import { isIPRange, vg } from 'valgen';

isIPRange('192.168.1.0/24'); // => '192.168.1.0/24'
isIPRange('192.168.1.0'); // throws ValidationError: "Value must be a valid IP range" (missing subnet mask)
isIPRange.silent('192.168.1.0'); // => { errors: [...] }

const isIPv4Range = vg.isIPRange(4);
isIPv4Range('192.168.1.0/24'); // => '192.168.1.0/24'
```

## isISSN

Validates that a string is a valid ISSN (International Standard Serial Number).

**Availability:** Pre-built (`import { isISSN } from 'valgen'`).

**Signature**
```ts
isISSN(options?: isISSN.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `caseSensitive` | `boolean` | `false` | If `true`, rejects ISSNs whose check digit is a lowercase `x`. |

**Behavior**
- Delegates to `validatorJS.isISSN(input, { case_sensitive })`.

**Example**
```ts
import { isISSN, vg } from 'valgen';

isISSN('0378-5955'); // => '0378-5955'
isISSN('1234-1234'); // throws ValidationError: "Value must be a valid ISSN"
isISSN.silent('1234-1234'); // => { errors: [...] }

isISSN('1000-002x'); // => '1000-002x' (lowercase check digit allowed by default)
const strict = vg.isISSN({ caseSensitive: true });
strict('1000-002x'); // throws ValidationError: "Value must be a valid ISSN"
```

## isJWT

Validates that a string is structurally a valid JWT (JSON Web Token).

**Availability:** Pre-built (`import { isJWT } from 'valgen'`).

**Signature**
```ts
isJWT(options?: isJWT.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isJWT(input)`, which checks for three base64url segments separated by `.` (it does not verify a signature).

**Example**
```ts
import { isJWT } from 'valgen';

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
isJWT(jwt); // => jwt
isJWT('abc.def'); // throws ValidationError: "Value must be valid JWT token"
isJWT.silent('abc.def'); // => { errors: [...] }
```

## isLowercase

Validates that a string contains only lowercase characters.

**Availability:** Pre-built (`import { isLowercase } from 'valgen'`).

**Signature**
```ts
isLowercase(options?: isLowercase.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isLowercase(input)`.

**Example**
```ts
import { isLowercase } from 'valgen';

isLowercase('abc'); // => 'abc'
isLowercase('ABC'); // throws ValidationError: "Value must be a lowercase string"
isLowercase.silent('ABC'); // => { errors: [...] }
```

## isMACAddress

Validates that a string is a valid MAC address.

**Availability:** Pre-built (`import { isMACAddress } from 'valgen'`).

**Signature**
```ts
isMACAddress(options?: isMACAddress.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `noSeparators` | `boolean` | `false` | Allow addresses without colons (also allows hyphens or spaces as separators). |
| `eui` | `'48' \| '64'` | `undefined` | Restrict validation to EUI-48 or EUI-64 format instead of accepting either. |

**Behavior**
- Delegates to `validatorJS.isMACAddress(input, { no_separators, eui })`.

**Example**
```ts
import { isMACAddress, vg } from 'valgen';

isMACAddress('01:02:03:04:05:ab'); // => '01:02:03:04:05:ab'
isMACAddress('0102030405ab'); // throws ValidationError: "Value must be a valid MAC address" (no separators, rejected by default)
isMACAddress.silent('not-a-mac'); // => { errors: [...] }

const noSeparators = vg.isMACAddress({ noSeparators: true });
noSeparators('0102030405ab'); // => '0102030405ab'
```

## isMobilePhone

Validates that a string is a valid mobile phone number.

**Availability:** Pre-built (`import { isMobilePhone } from 'valgen'`).

**Signature**
```ts
isMobilePhone(options?: isMobilePhone.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `locale` | `'any' \| MobilePhoneLocale \| MobilePhoneLocale[]` | `'any'` | Locale(s) (e.g. `'en-US'`, `'tr-TR'`) to validate against. |
| `strictMode` | `boolean` | `false` | If `true`, requires the number to include a `+` country code prefix. |

**Behavior**
- Delegates to `validatorJS.isMobilePhone(input, options.locale, { strictMode })`.

**Example**
```ts
import { isMobilePhone, vg } from 'valgen';

isMobilePhone('+14155552671'); // => '+14155552671'
isMobilePhone('12345'); // throws ValidationError: "Value must be a valid Mobile Phone Number"
isMobilePhone.silent('12345'); // => { errors: [...] }

const trStrict = vg.isMobilePhone({ locale: 'tr-TR', strictMode: true });
trStrict('+905321234567'); // => '+905321234567'
trStrict('5321234567'); // throws ValidationError (missing country code)
```

## isObjectId

Validates that a value is a valid MongoDB `ObjectId` (a 24-char hex string, a 12-byte `Uint8Array`, or an object exposing `toHexString()`).

**Availability:** Pre-built (`import { isObjectId } from 'valgen'`).

**Signature**
```ts
isObjectId(options?: ValidationOptions): Validator<string | Uint8Array | isObjectId.ObjectIdLike, unknown>
```

**Behavior**
- Accepts: a 24-character hexadecimal string, a `Uint8Array` of length 12, or any object with a `toHexString()` method whose returned string passes the same check. This is not a wrapper around `@browsery/validator.isObjectId` — it implements its own check using `validatorJS.isHexadecimal` for the string case.

**Example**
```ts
import { isObjectId } from 'valgen';

const idString = '64897efbdf01a60ac1b678ea';
isObjectId(idString); // => '64897efbdf01a60ac1b678ea'
isObjectId(undefined); // throws ValidationError: "Value must be a valid ObjectId"
isObjectId.silent(undefined); // => { errors: [...] }
```

## isPassportNumber

Validates that a string is a valid passport number for the given country.

**Availability:** Factory only (`vg.isPassportNumber(countryCode, options?)`).

**Signature**
```ts
isPassportNumber(countryCode: string, options?: isPassportNumber.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isPassportNumber(input, countryCode)`, which checks the input against the passport number pattern for that ISO country code.

**Example**
```ts
import { vg } from 'valgen';

const isUSPassport = vg.isPassportNumber('US');
isUSPassport('123456789'); // => '123456789'
isUSPassport('12345'); // throws ValidationError: "Value must be a valid US Passport Number"
isUSPassport.silent('12345'); // => { errors: [...] }
```

## isPort

Validates that a value is a valid TCP/UDP port number, and coerces it to a `number`.

**Availability:** Pre-built (`import { isPort } from 'valgen'`).

**Signature**
```ts
isPort(options?: isPort.Options): Validator<number, string | number>
```

**Behavior**
- Accepts a `string` or `number` input; numbers are stringified before being checked with `validatorJS.isPort(input)`. On success, returns the value parsed as an integer (`number`), not the original string.

**Example**
```ts
import { isPort } from 'valgen';

isPort('80'); // => 80
isPort(80); // => 80
isPort('70000'); // throws ValidationError: "Value must be a valid port number"
isPort.silent('70000'); // => { errors: [...] }
```

## isSWIFT

Validates that a string is a valid BIC (Bank Identification Code) or SWIFT code.

**Availability:** Pre-built (`import { isSWIFT } from 'valgen'`).

**Signature**
```ts
isSWIFT(options?: isSWIFT.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isBIC(input)`.

**Example**
```ts
import { isSWIFT } from 'valgen';

isSWIFT('DEUTDEFF500'); // => 'DEUTDEFF500'
isSWIFT('1234DEFF'); // throws ValidationError: "Value must be a valid BIC (Bank Identification Code) or SWIFT code"
isSWIFT.silent('1234DEFF'); // => { errors: [...] }
```

## isTime

Validates (and optionally coerces) a time-of-day value in `HH:mm`, `HH:mm:ss`, or `HH:mm:ss.SSS` format, with or without separators.

**Availability:** Pre-built (`import { isTime } from 'valgen'`).

**Signature**
```ts
isTime(options?: isTime.Options): Validator<string, string | Date>
```

**Behavior**
- Not a wrapper around `@browsery/validator` - it uses its own regex (`/^(\d{2}):?(\d{2})(?::?(\d{2}))?(?:\.(\d{1,3}))?$/`) and validates hour ≤ 23, minutes/seconds ≤ 59.
- Accepts a `Date` input when `coerce` (option or `context.coerce`) is `true`, converting it to a `HH:mm:ss[.SSS]` string.
- Accepts compact forms without separators (e.g. `'1230'`, `'123048'`) and normalizes them to colon-separated form only when `coerce: true`; without `coerce`, the input string is returned unchanged.

**Example**
```ts
import { isTime } from 'valgen';

isTime('12:30', { coerce: true }); // => '12:30'
isTime('1230', { coerce: true }); // => '12:30'
isTime(new Date('2025-01-10T08:30:15'), { coerce: true }); // => '08:30:15'
isTime('25:00'); // throws ValidationError: "Value must be a valid Time"
isTime.silent('25:00'); // => { errors: [...] }
```

## isUppercase

Validates that a string contains only uppercase characters.

**Availability:** Pre-built (`import { isUppercase } from 'valgen'`).

**Signature**
```ts
isUppercase(options?: isUppercase.Options): Validator<string, string>
```

**Behavior**
- Delegates to `validatorJS.isUppercase(input)`.

**Example**
```ts
import { isUppercase } from 'valgen';

isUppercase('ABC'); // => 'ABC'
isUppercase('abc'); // throws ValidationError: "Value must be an uppercase string"
isUppercase.silent('abc'); // => { errors: [...] }
```

## isURL

Validates that a string is a valid URL.

**Availability:** Pre-built (`import { isURL } from 'valgen'`).

**Signature**
```ts
isURL(options?: isURL.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `protocols` | `string[]` | `['http','https','ftp']` | Allowed protocols. |
| `require_tld` | `boolean` | `true` | Require a top-level domain. |
| `require_protocol` | `boolean` | `false` | Require the protocol (`scheme://`) to be present. |
| `require_host` | `boolean` | `true` | Require a host part. |
| `require_port` | `boolean` | `false` | Require an explicit port. |
| `require_valid_protocol` | `boolean` | `true` | Restrict to protocols in `protocols`. |
| `allow_underscores` | `boolean` | `false` | Allow underscores in the host. |
| `host_whitelist` | `Array<string \| RegExp>` | `false` | Only accept these hosts. |
| `host_blacklist` | `Array<string \| RegExp>` | `false` | Reject these hosts. |
| `allow_trailing_dot` | `boolean` | `false` | Allow a trailing `.` after the domain. |
| `allow_protocol_relative_urls` | `boolean` | `false` | Allow `//example.com`-style URLs. |
| `disallow_auth` | `boolean` | `false` | Reject `user:pass@host` credentials. |
| `allow_fragments` | `boolean` | `true` | Allow a `#fragment`. |
| `allow_query_components` | `boolean` | `true` | Allow a `?query=components` section. |
| `validate_length` | `boolean` | `true` | Enforce the max length check. |
| `max_allowed_length` | `number \| false` | `2084` | Max URL length when `validate_length` is enabled. |

**Behavior**
- Delegates directly to `validatorJS.isURL(input, options)`; all `IsURLOptions` fields pass through unchanged.

**Example**
```ts
import { isURL, vg } from 'valgen';

isURL('https://example.com'); // => 'https://example.com'
isURL('not a url'); // throws ValidationError: "Value must be a valid URL"
isURL.silent('not a url'); // => { errors: [...] }

const httpsOnly = vg.isURL({ protocols: ['https'] });
httpsOnly('http://example.com'); // throws ValidationError: "Value must be a valid URL"
```

## isUUID

Validates that a string is a valid UUID, optionally restricted to a specific version.

**Availability:** Pre-built for "any version" (`import { isUUID } from 'valgen'`); versioned pre-built instances `isUUID1` through `isUUID8` are also exported directly from `'valgen'`. The version-selecting factory form is `vg.isUUID(version)`.

**Signature**
```ts
isUUID(version?: isUUID.UUIDVersion, options?: isUUID.Options): Validator<string, string>
```
`UUIDVersion` is `'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'nil'|'max'|'loose'|'all'` or the numeric equivalents `1-8`.

**Behavior**
- Delegates to `validatorJS.isUUID(input, version)`. Without a version, any UUID version passes; with a version, only a UUID of that version passes.

**Example**
```ts
import { isUUID, isUUID4, vg } from 'valgen';

const uuidV4 = '01e0fee8-60d5-42a5-997c-b55a4f3e973f';
isUUID(uuidV4); // => uuidV4 (any version accepted)
isUUID4(uuidV4); // => uuidV4
isUUID(undefined as any); // throws ValidationError: "Value must be a valid UUID"

const isUUIDv1 = vg.isUUID(1);
isUUIDv1(uuidV4); // throws ValidationError: "Value must be a valid UUID v1"
isUUID.silent(undefined as any); // => { errors: [...] }
```

## isVATNumber

Validates that a string is a valid VAT (Value Added Tax) number for the given EU country code.

**Availability:** Factory only (`vg.isVATNumber(countryCode, options?)`).

**Signature**
```ts
isVATNumber(countryCode: isVATNumber.CountryCode, options?: isVATNumber.Options): Validator<string, string>
```
`CountryCode` is a union of EU VAT country codes (e.g. `'AT' | 'BE' | 'BG' | 'HR' | 'CY' | ...`).

**Behavior**
- Delegates to `validatorJS.isVAT(input, countryCode)`.

**Example**
```ts
import { vg } from 'valgen';

const isATVat = vg.isVATNumber('AT');
isATVat('ATU12345678'); // => 'ATU12345678'
isATVat('12345'); // throws ValidationError: "Value must be a valid VAT number"
isATVat.silent('12345'); // => { errors: [...] }
```

## matches

Validates that a string matches a given regular expression pattern. Returns `undefined` for nullish input instead of failing.

**Availability:** Factory only (`vg.matches(pattern, options?)`).

**Signature**
```ts
matches(format: string | RegExp, options?: matches.Options): Validator<string, string>
```

**Options**
| Option | Type | Default | Description |
|---|---|---|---|
| `formatName` | `string` | `undefined` | Name used in the error message (`Value must match <formatName> format`); defaults to `'requested'` when omitted. |

**Behavior**
- A string pattern is compiled via `new RegExp(format)`. `null`/`undefined` input passes through as `undefined` without validation. Any other non-string input, or a string that doesn't match, fails.

**Example**
```ts
import { vg } from 'valgen';

const isDigits = vg.matches(/\d+/);
isDigits('0123'); // => '0123'
isDigits('abc'); // throws ValidationError: "Value must match requested format"
isDigits.silent('abc'); // => { errors: [...] }

const isPositiveNumber = vg.matches(/\d+/, { formatName: 'positive number' });
isPositiveNumber('abc'); // throws ValidationError: "Value must match positive number format"
```
