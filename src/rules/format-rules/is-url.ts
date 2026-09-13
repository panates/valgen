import validatorJS, {
  type IsURLOptions as _IsURLOptions,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid URL, by delegating directly to
 * `validatorJS.isURL(input, options)`; all `IsURLOptions` fields pass through
 * unchanged.
 *
 * @param options - Validation options - see {@link isURL.Options} for the
 *   forwarded `IsURLOptions` fields.
 * @returns The validated URL string, unchanged.
 * @throws `Value must be a valid URL` when the input isn't a valid URL.
 *
 * @example
 * ```ts
 * import { isURL, vg } from 'valgen';
 *
 * isURL('https://example.com'); // => 'https://example.com'
 * isURL('not a url'); // throws ValidationError: "Value must be a valid URL"
 *
 * const httpsOnly = vg.isURL({ protocols: ['https'] });
 * httpsOnly('http://example.com'); // throws ValidationError: "Value must be a valid URL"
 * ```
 * @validator isURL
 */
export function isURL(options?: isURL.Options) {
  return validator<string, string>(
    isURL.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isURL(input, options)
      ) {
        return input;
      }
      context.fail(_this, `Value must be a valid URL`, input);
    },
    options,
  );
}

export namespace isURL {
  export interface Options extends ValidationOptions, _IsURLOptions {
    /**
     * Allowed protocols.
     * @defaultValue `['http','https','ftp']`
     */
    protocols?: string[];
    /**
     * Require a top-level domain.
     * @defaultValue `true`
     */
    require_tld?: boolean;
    /**
     * Require the protocol (`scheme://`) to be present.
     * @defaultValue `false`
     */
    require_protocol?: boolean;
    /**
     * Require a host part.
     * @defaultValue `true`
     */
    require_host?: boolean;
    /**
     * Require an explicit port.
     * @defaultValue `false`
     */
    require_port?: boolean;
    /**
     * Restrict to protocols in `protocols`.
     * @defaultValue `true`
     */
    require_valid_protocol?: boolean;
    /**
     * Allow underscores in the host.
     * @defaultValue `false`
     */
    allow_underscores?: boolean;
    /**
     * Only accept these hosts.
     * @defaultValue `false`
     */
    host_whitelist?: (string | RegExp)[];
    /**
     * Reject these hosts.
     * @defaultValue `false`
     */
    host_blacklist?: (string | RegExp)[];
    /**
     * Allow a trailing `.` after the domain.
     * @defaultValue `false`
     */
    allow_trailing_dot?: boolean;
    /**
     * Allow `//example.com`-style URLs.
     * @defaultValue `false`
     */
    allow_protocol_relative_urls?: boolean;
    /**
     * Reject `user:pass@host` credentials.
     * @defaultValue `false`
     */
    disallow_auth?: boolean;
    /**
     * Allow a `#fragment`.
     * @defaultValue `true`
     */
    allow_fragments?: boolean;
    /**
     * Allow a `?query=components` section.
     * @defaultValue `true`
     */
    allow_query_components?: boolean;
    /**
     * Enforce the max length check.
     * @defaultValue `true`
     */
    validate_length?: boolean;
    /**
     * Max URL length when `validate_length` is enabled.
     * @defaultValue `2084`
     */
    max_allowed_length?: number | false;
  }
}
