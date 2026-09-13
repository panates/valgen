import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string contains only lowercase characters. Delegates to
 * `validatorJS.isLowercase(input)`.
 * @validator isLowercase
 * @param options - Validation options.
 * @returns The validated lowercase string, unchanged.
 * @throws `Value must be a lowercase string` when the input is not a
 *   string, or contains any non-lowercase characters.
 * @example
 * ```ts
 * import { isLowercase } from 'valgen';
 *
 * isLowercase('abc'); // => 'abc'
 * isLowercase('ABC'); // throws ValidationError: "Value must be a lowercase string"
 * ```
 */
export function isLowercase(options?: isLowercase.Options) {
  return validator<string, string>(
    isLowercase.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isLowercase(input)) {
        return input;
      }
      context.fail(_this, `Value must be a lowercase string`, input);
    },
    options,
  );
}

export namespace isLowercase {
  export interface Options extends ValidationOptions {}
}
