import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a hexadecimal number. Delegates to
 * `validatorJS.isHexadecimal(input)`.
 * @validator isHex
 * @param options - Validation options.
 * @returns The validated hexadecimal string, unchanged.
 * @throws `Value must be an hexadecimal string` when the input is not a
 *   string, or is not a valid hexadecimal number.
 * @example
 * ```ts
 * import { isHex } from 'valgen';
 *
 * isHex('1a2B3c'); // => '1a2B3c'
 * isHex('zzz'); // throws ValidationError: "Value must be an hexadecimal string"
 * ```
 */
export function isHex(options?: isHex.Options) {
  return validator<string, string>(
    isHex.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isHexadecimal(input)) {
        return input;
      }
      context.fail(_this, `Value must be an hexadecimal string`, input);
    },
    options,
  );
}

export namespace isHex {
  export interface Options extends ValidationOptions {}
}
