import validatorJS, {
  type IsFQDNOptions as _IsFQDNOptions,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a fully qualified domain name (e.g.
 * `domain.com`). Delegates to `validatorJS.isFQDN(input, { allow_wildcard })`.
 * Only `allowWildcard` is forwarded; other underlying options
 * (`require_tld`, `allow_underscores`, etc.) are not currently exposed.
 * @validator isFQDN
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a valid FQDN: `Value must be valid FQDN`
 * @example
 * ```ts
 * isFQDN('example.com'); // => 'example.com'
 * isFQDN('*.example.com'); // throws ValidationError: "Value must be valid FQDN" (wildcard rejected by default)
 * ```
 */
export function isFQDN(options?: isFQDN.Options) {
  const opts: _IsFQDNOptions = {
    allow_wildcard: options?.allowWildcard,
  };
  return validator<string, string>(
    isFQDN.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isFQDN(input, opts)) {
        return input;
      }
      context.fail(_this, `Value must be valid FQDN`, input);
    },
    options,
  );
}

export namespace isFQDN {
  export interface Options extends ValidationOptions {
    /**
     * If set to true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`).
     * @defaultValue false
     */
    allowWildcard?: boolean;
  }
}
