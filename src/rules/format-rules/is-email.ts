import validatorJS, {
  type IsEmailOptions as _IsEmailOptions,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a well-formed email address. Wraps
 * `validatorJS.isEmail`, always passing `allow_display_name: true` as a
 * base, then layers additional checks (display name requirement/
 * prohibition, host black/white list, blacklisted characters) as separate
 * re-validation passes, each producing a specific error message.
 * @validator isEmail
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a well-formed email address: `Value must match required e-mail format`
 * @example
 * ```ts
 * isEmail('me@domain.com'); // => 'me@domain.com'
 * isEmail('invalid'); // throws ValidationError: "Value must match required e-mail format"
 * ```
 */
export function isEmail(options?: isEmail.Options) {
  const emailOptions: _IsEmailOptions = {
    allow_display_name: true,
    allow_utf8_local_part: options?.utf8LocalPart,
    ignore_max_length: options?.ignoreMaxLength,
    allow_ip_domain: options?.allowIpDomain,
    domain_specific_validation: options?.domainSpecificValidation,
  };
  return validator<string, string>(
    isEmail.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        typeof input === 'string' &&
        validatorJS.isEmail(input, emailOptions)
      ) {
        if (options?.requireDisplayName) {
          if (
            !validatorJS.isEmail(input, {
              ...emailOptions,
              require_display_name: true,
            })
          ) {
            context.fail(
              _this,
              `Display name for the email is required. Etc. ( Name <me@tempuri.org> ) `,
              input,
            );
            return;
          }
        } else if (
          !options?.allowDisplayName &&
          !validatorJS.isEmail(input, {
            ...emailOptions,
            allow_display_name: false,
          })
        ) {
          context.fail(_this, `Display name in email is not allowed`, input);
          return;
        }
        if (
          options?.hostBlacklist &&
          !validatorJS.isEmail(input, {
            ...emailOptions,
            host_blacklist: options.hostBlacklist,
          })
        ) {
          context.fail(_this, `Email "{{value}}" is in black-list`, input);
          return;
        }
        if (
          options?.hostWhitelist &&
          !validatorJS.isEmail(input, {
            ...emailOptions,
            host_whitelist: options.hostWhitelist,
          })
        ) {
          context.fail(_this, `Email "{{value}}" is in not white-list`, input);
          return;
        }
        if (
          options?.blacklistedChars &&
          !validatorJS.isEmail(input, {
            ...emailOptions,
            blacklisted_chars: options.blacklistedChars,
          })
        ) {
          context.fail(
            _this,
            `Black listed characters (${options.blacklistedChars}) found in name part`,
            input,
          );
          return;
        }
        return input;
      }
      context.fail(_this, `Value must match required e-mail format`, input);
    },
    options,
  );
}

export namespace isEmail {
  export interface Options extends ValidationOptions {
    /**
     * If set to `true`, the validator will also match `Display Name <email-address>`.
     *
     * @defaultValue false
     */
    allowDisplayName?: boolean;

    /**
     * If set to `true`, the validator will reject strings without the format `Display Name <email-address>`.
     *
     * @defaultValue false
     */
    requireDisplayName?: boolean;

    /**
     * If set to `false`, the validator will not allow any non-English UTF8 character in email address' local part.
     *
     * @defaultValue true
     */
    utf8LocalPart?: boolean;

    /**
     * If set to `true`, the validator will not check for the standard max length of an email.
     *
     * @defaultValue false
     */
    ignoreMaxLength?: boolean;

    /**
     * If set to `true`, the validator will allow IP addresses in the host part.
     *
     * @defaultValue false
     */
    allowIpDomain?: boolean;

    /**
     * If set to `true`, some additional validation will be enabled,
     * e.g. disallowing certain syntactically valid email addresses that are rejected by GMail.
     *
     * @defaultValue false
     */
    domainSpecificValidation?: boolean;

    /**
     *  If set to an array of strings and the part of the email after
     *  the @ symbol matches one of the strings defined in it,
     *  the validation fails.
     */
    hostBlacklist?: string[];

    /**
     * If set to an array of strings and the part of the email after
     * the @ symbol matches none of the strings defined in it,
     * the validation fails.
     */
    hostWhitelist?: string[];

    /**
     *  If set to a string, then the validator will reject emails that include
     *  any of the characters in the string, in the name part.
     */
    blacklistedChars?: string;
  }
}
