import validatorJS, { type IPVersion as _IPVersion } from '@browsery/validator';
import { type Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid IP address (v4 or v6). Delegates to
 * `validatorJS.isIP(input, version)`. Without a version, either IPv4 or IPv6
 * is accepted; with a version, only that version passes.
 * @validator isIP
 * @param version - Restricts validation to `'4'`/`4` or `'6'`/`6`; omit to
 *   accept either version.
 * @param options - Validation options.
 * @returns The validated IP address string, unchanged.
 * @throws `Value must be a valid IP` (or `Value must be a valid IP v${version}`
 *   when `version` is given) when the input is not a string, or is not a
 *   valid IP address of the requested version.
 * @example
 * ```ts
 * import { isIP, vg } from 'valgen';
 *
 * isIP('192.168.1.1'); // => '192.168.1.1'
 * isIP('not-an-ip'); // throws ValidationError: "Value must be a valid IP"
 *
 * const isIPv4 = vg.isIP(4);
 * isIPv4('10.0.0.1'); // => '10.0.0.1'
 * isIPv4('2001:db8::1'); // throws ValidationError: "Value must be a valid IP v4"
 * ```
 */
export function isIP(version?: isIP.IPVersion, options?: ValidationOptions) {
  return validator<string, string>(
    isIP.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isIP(input, version)
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be a valid IP${version ? ' v' + version : ''}`,
        input,
      );
    },
    options,
  );
}

/**
 * Validates that a string is a valid IP address range in CIDR notation (v4
 * or v6). Delegates to `validatorJS.isIPRange(input, version)`, requiring a
 * `/`-delimited subnet mask.
 * @validator isIPRange
 * @param version - Restricts validation to `'4'`/`4` or `'6'`/`6`; omit to
 *   accept either version.
 * @param options - Validation options.
 * @returns The validated CIDR range string, unchanged.
 * @throws `Value must be a valid IP range` (or `Value must be a valid IP
 *   v${version} range` when `version` is given) when the input is not a
 *   string, or is not a valid CIDR range of the requested version (e.g. a
 *   missing subnet mask).
 * @example
 * ```ts
 * import { isIPRange, vg } from 'valgen';
 *
 * isIPRange('192.168.1.0/24'); // => '192.168.1.0/24'
 * isIPRange('192.168.1.0'); // throws ValidationError: "Value must be a valid IP range"
 *
 * const isIPv4Range = vg.isIPRange(4);
 * isIPv4Range('192.168.1.0/24'); // => '192.168.1.0/24'
 * ```
 */
export function isIPRange(
  version?: isIPRange.IPVersion,
  options?: ValidationOptions,
) {
  return validator<string, string>(
    isIPRange.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isIPRange(input, version)
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be a valid IP${version ? ' v' + version : ''} range`,
        input,
      );
    },
    options,
  );
}

export namespace isIP {
  /** The IP versions accepted by {@link isIP}'s `version` argument. */
  export type IPVersion = _IPVersion;
}

export namespace isIPRange {
  /** The IP versions accepted by {@link isIPRange}'s `version` argument. */
  export type IPVersion = _IPVersion;
}
