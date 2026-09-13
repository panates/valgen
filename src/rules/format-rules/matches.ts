import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string matches a given regular expression pattern.
 * Returns `undefined` for nullish input instead of failing. A string pattern
 * is compiled via `new RegExp(format)`.
 *
 * @param format - The pattern to match against - a `RegExp`, or a string
 *   compiled into one.
 * @param options - Validation options.
 * @returns The validated string, unchanged, or `undefined` when the input
 *   was `null`/`undefined`.
 * @throws `Value must match <formatName> format` (using `'requested'` when
 *   `formatName` is omitted) when the input isn't a string or doesn't match.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * const isDigits = vg.matches(/\d+/);
 * isDigits('0123'); // => '0123'
 * isDigits('abc'); // throws ValidationError: "Value must match requested format"
 *
 * const isPositiveNumber = vg.matches(/\d+/, { formatName: 'positive number' });
 * isPositiveNumber('abc'); // throws ValidationError: "Value must match positive number format"
 * ```
 * @validator matches
 */
export function matches(format: string | RegExp, options?: matches.Options) {
  const regExp = format instanceof RegExp ? format : new RegExp(format);
  const formatName = options?.formatName;
  return validator<string, string>(
    matches.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (input == null) return;
      regExp.lastIndex = 0;
      if (typeof input === 'string' && regExp.test(input)) return input;
      context.fail(
        _this,
        `Value must match ${formatName || 'requested'} format`,
        input,
        {
          format,
          formatName,
        },
      );
    },
    options,
  );
}

export namespace matches {
  export interface Options extends ValidationOptions {
    /**
     * Name used in the error message (`Value must match <formatName> format`).
     * @defaultValue `'requested'`
     */
    formatName?: string;
  }
}
