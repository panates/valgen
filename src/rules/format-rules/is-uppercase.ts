import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string contains only uppercase characters, by delegating
 * to `validatorJS.isUppercase(input)`.
 *
 * @param options - Validation options.
 * @returns The validated string, unchanged.
 * @throws `Value must be an uppercase string` when the input contains any
 *   non-uppercase characters.
 *
 * @example
 * ```ts
 * import { isUppercase } from 'valgen';
 *
 * isUppercase('ABC'); // => 'ABC'
 * isUppercase('abc'); // throws ValidationError: "Value must be an uppercase string"
 * ```
 * @validator isUppercase
 */
export function isUppercase(options?: isUppercase.Options) {
  return validator<string, string>(
    isUppercase.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isUppercase(input)) {
        return input;
      }
      context.fail(_this, `Value must be an uppercase string`, input);
    },
    options,
  );
}

export namespace isUppercase {
  export interface Options extends ValidationOptions {}
}
