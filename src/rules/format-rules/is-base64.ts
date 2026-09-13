import validatorJS, {
  type IsBase64Options as _IsBase64Options,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is Base64-encoded. Delegates to
 * `validatorJS.isBase64(input, options)`.
 * @validator isBase64
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a valid Base64 string: `Value must be a Base64 string`
 * @example
 * ```ts
 * isBase64('SGVsbG8gV29ybGQ='); // => 'SGVsbG8gV29ybGQ='
 * isBase64('not-base64!!'); // throws ValidationError: "Value must be a Base64 string"
 * ```
 */
export function isBase64(options?: isBase64.Options) {
  return validator<string, string>(
    isBase64.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isBase64(input, options)) {
        return input;
      }
      context.fail(_this, `Value must be a Base64 string`, input);
    },
    options,
  );
}

export namespace isBase64 {
  export interface Options extends ValidationOptions, _IsBase64Options {
    /**
     * If `true`, expects URL-safe Base64 (`-`/`_` instead of `+`/`/`).
     * @defaultValue false
     */
    urlSafe?: boolean;

    /**
     * Whether trailing `=` padding is required.
     * @defaultValue !urlSafe
     */
    padding?: boolean;
  }
}
