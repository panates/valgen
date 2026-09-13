import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string represents a decimal number, such as `0.1`, `.3`,
 * `1.1`, `1.00003`, `4.0` etc. Delegates to `validatorJS.isDecimal(input)`
 * with no options passed through, so it always uses the underlying
 * library's default rules.
 * @validator isDecimal
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a decimal number string: `Value must be a decimal number string`
 * @example
 * ```ts
 * isDecimal('1.5'); // => '1.5'
 * isDecimal('abc'); // throws ValidationError: "Value must be a decimal number string"
 * ```
 */
export function isDecimal(options?: isDecimal.Options) {
  return validator<string, string>(
    isDecimal.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isDecimal(input)) {
        return input;
      }
      context.fail(_this, `Value must be a decimal number string`, input);
    },
    options,
  );
}

export namespace isDecimal {
  export interface Options extends ValidationOptions {}
}
