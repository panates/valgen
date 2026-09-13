import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string contains only letters and numbers. Delegates to
 * `validatorJS.isAlphanumeric`.
 * @validator isAlphanumeric
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a string of letters/numbers only: `Value must be an alphanumeric string`
 * @example
 * ```ts
 * isAlphanumeric('abc123'); // => 'abc123'
 * isAlphanumeric('abc-123'); // throws ValidationError: "Value must be an alphanumeric string"
 * ```
 */
export function isAlphanumeric(options?: isAlphanumeric.Options) {
  return validator<string, string>(
    isAlphanumeric.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isAlphanumeric(input)) {
        return input;
      }
      context.fail(_this, `Value must be an alphanumeric string`, input);
    },
    options,
  );
}

export namespace isAlphanumeric {
  export interface Options extends ValidationOptions {}
}
