import validatorJS, {
  type IsISSNOptions as _IsISSNOptions,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid ISSN (International Standard Serial
 * Number). Delegates to `validatorJS.isISSN(input, { case_sensitive })`.
 * @validator isISSN
 * @param options - Validation options.
 * @returns The validated ISSN string, unchanged.
 * @throws `Value must be a valid ISSN` when the input is not a string, is
 *   not a valid ISSN, or (with `caseSensitive: true`) has a lowercase `x`
 *   check digit.
 * @example
 * ```ts
 * import { isISSN, vg } from 'valgen';
 *
 * isISSN('0378-5955'); // => '0378-5955'
 * isISSN('1234-1234'); // throws ValidationError: "Value must be a valid ISSN"
 *
 * isISSN('1000-002x'); // => '1000-002x' (lowercase check digit allowed by default)
 * const strict = vg.isISSN({ caseSensitive: true });
 * strict('1000-002x'); // throws ValidationError: "Value must be a valid ISSN"
 * ```
 */
export function isISSN(options?: isISSN.Options) {
  const opts: _IsISSNOptions = {
    case_sensitive: options?.caseSensitive,
  };
  return validator<string, string>(
    isISSN.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isISSN(input, opts)) {
        return input;
      }
      context.fail(_this, `Value must be a valid ISSN`, input);
    },
    options,
  );
}

export namespace isISSN {
  export interface Options extends ValidationOptions {
    /**
     * If set to `true`, ISSNs with a lowercase `x` as the check digit are rejected.
     *
     * @defaultValue false
     */
    caseSensitive?: boolean;
  }
}
