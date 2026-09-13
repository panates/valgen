import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string contains only ASCII characters. Delegates to
 * `validatorJS.isAscii`.
 * @validator isAscii
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` contains non-ASCII characters: `Value must be an ascii string`
 * @example
 * ```ts
 * isAscii('abc123!@#'); // => 'abc123!@#'
 * isAscii('şiir'); // throws ValidationError: "Value must be an ascii string"
 * ```
 */
export function isAscii(options?: isAscii.Options) {
  return validator<string, string>(
    isAscii.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isAscii(input)) return input;
      context.fail(_this, `Value must be an ascii string`, input);
    },
    options,
  );
}

export namespace isAscii {
  export interface Options extends ValidationOptions {}
}
