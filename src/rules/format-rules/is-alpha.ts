import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string contains only letters (`a-zA-Z`). Delegates to
 * `validatorJS.isAlpha`.
 * @validator isAlpha
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a string of letters only: `Value must be an alpha string`
 * @example
 * ```ts
 * isAlpha('abcDEF'); // => 'abcDEF'
 * isAlpha('abc123'); // throws ValidationError: "Value must be an alpha string"
 * ```
 */
export function isAlpha(options?: isAlpha.Options) {
  return validator<string, string>(
    isAlpha.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isAlpha(input)) return input;
      context.fail(_this, `Value must be an alpha string`, input);
    },
    options,
  );
}

export namespace isAlpha {
  export interface Options extends ValidationOptions {}
}
