import { type Nullish, validator } from '../../core/index.js';

/**
 * Runs `String(input).replace(searchValue, replacer)`, mirroring
 * `String.prototype.replace`.
 *
 * `null`/`undefined` input is passed through unchanged (the replace is
 * skipped). Any other input is coerced with `String(input)` and then
 * `.replace(searchValue, replacer)` is applied, exactly like the native
 * method - `searchValue` can be a string, a `RegExp` (with or without the
 * global flag), or any object implementing `Symbol.replace`, and the
 * replacer can be a literal string or a substitution callback.
 *
 * @param searchValue - The pattern to search for: a string, `RegExp`, or any
 *   object implementing `Symbol.replace`.
 * @param replacer - The replacement: a literal string, or a callback
 *   returning the substitution for each match.
 * @returns A validator that returns the replaced string, or the passed-through
 *   nullish value.
 * @throws Never fails/throws on its own.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.stringReplace(/-/g, '_')('a-b'); // => 'a_b'
 * vg.stringReplace('-', '_')(null); // => null
 * ```
 * @validator stringReplace
 */
export function stringReplace(
  searchValue: string | RegExp,
  replaceValue: string,
);
export function stringReplace(
  searchValue: string | RegExp,
  replacer: (subsring: string, ...args: any[]) => string,
);
export function stringReplace(
  searchValue: {
    [Symbol.replace](string: string, replaceValue: string): string;
  },
  replaceValue: string,
);
export function stringReplace(
  searchValue: {
    [Symbol.replace](
      string: string,
      replacer: (substring: string, ...args: any[]) => string,
    ): string;
  },
  replacer: (substring: string, ...args: any[]) => string,
);
export function stringReplace(searchValue: any, replacer: any) {
  return validator<string>(
    stringReplace.name,
    (input: unknown): Nullish<string> => {
      if (input == null) return input;
      return String(input).replace(searchValue, replacer);
    },
  );
}

/**
 * Runs `String(input).split(separator, limit)`, mirroring
 * `String.prototype.split`.
 *
 * `null`/`undefined` input is passed through unchanged (the split is
 * skipped). Any other input is coerced with `String(input)` and then
 * `.split(separator, limit)` is applied, exactly like the native method.
 *
 * @param separator - The delimiter: a string, `RegExp`, or any object
 *   implementing `Symbol.split`.
 * @param limit - Maximum number of substrings to include in the result.
 * @returns A validator that returns the resulting array, or the
 *   passed-through nullish value.
 * @throws Never fails/throws on its own.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.stringSplit(',')('a,b'); // => ['a', 'b']
 * vg.stringSplit(',')(null); // => null
 * ```
 * @validator split
 */
export function stringSplit(separator: string | RegExp, limit?: number);
export function stringSplit(
  splitter: { [Symbol.split](string: string, limit?: number): string[] },
  limit?: number,
);
export function stringSplit(splitter: any, limit: any) {
  return validator<string[], string>(stringSplit.name, (input: unknown) => {
    if (input == null) return input;
    return String(input).split(splitter, limit);
  });
}

/**
 * Removes whitespace from both ends of a string, mirroring
 * `String.prototype.trim`.
 *
 * `null`/`undefined` input is passed through unchanged. Any other input is
 * coerced with `String(input)` and then `.trim()` is applied.
 *
 * @returns A validator that returns the trimmed string, or the
 *   passed-through nullish value.
 * @throws Never fails/throws on its own.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.trim()(' a '); // => 'a'
 * vg.trim()(null); // => null
 * ```
 * @validator trim
 */
export function trim() {
  return validator<string, string>(trim.name, (input: unknown) => {
    if (input == null) return input;
    return String(input).trim();
  });
}

// *************************************************************

/**
 * Removes whitespace from the end of a string, mirroring
 * `String.prototype.trimEnd`.
 *
 * `null`/`undefined` input is passed through unchanged. Any other input is
 * coerced with `String(input)` and then `.trimEnd()` is applied (leading
 * whitespace is left untouched).
 *
 * @returns A validator that returns the trimmed string, or the
 *   passed-through nullish value.
 * @throws Never fails/throws on its own.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.trimEnd()(' a '); // => ' a'
 * vg.trimEnd()(null); // => null
 * ```
 * @validator trimEnd
 */
export function trimEnd() {
  return validator<string, string>(
    trimEnd.name,
    (input: unknown): Nullish<string> => {
      if (input == null) return input;
      return String(input).trimEnd();
    },
  );
}

// *************************************************************

/**
 * Removes whitespace from the beginning of a string, mirroring
 * `String.prototype.trimStart`.
 *
 * `null`/`undefined` input is passed through unchanged. Any other input is
 * coerced with `String(input)` and then `.trimStart()` is applied (trailing
 * whitespace is left untouched).
 *
 * @returns A validator that returns the trimmed string, or the
 *   passed-through nullish value.
 * @throws Never fails/throws on its own.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.trimStart()(' a '); // => 'a '
 * vg.trimStart()(null); // => null
 * ```
 * @validator trimStart
 */
export function trimStart() {
  return validator<string, string>(
    trimStart.name,
    (input: unknown): Nullish<string> => {
      if (input == null) return input;
      return String(input).trimStart();
    },
  );
}
