import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import type { range } from './range.js';

/**
 * Checks that the value is greater than `minValue`. Supports `number`,
 * `bigint`, `Date`, and `string` comparisons (numbers and bigints can be
 * compared against each other). Despite the `Nullish<T>` return type, there
 * is **no** null/undefined passthrough here - nullish input falls through
 * every branch and fails.
 *
 * @typeParam T - The type of `minValue` (`range.Input`: `number | bigint | Date | string`).
 * @param minValue - The value the input must be strictly greater than.
 * @param options - Validation options, including `caseInsensitive` for
 * string comparisons.
 * @returns The input value unchanged when it is greater than `minValue`.
 * @throws `Value must be greater than <minValue>` (string `minValue` quoted,
 * e.g. `"B"`) if the comparison fails, or if `input`/`minValue` are not a
 * matching comparable type.
 * @example
 * ```ts
 * vg.isGt(5)(6);     // => 6
 * vg.isGt(5)(5);     // throws ValidationError: "...must be greater than 5"
 * vg.isGt('B')('C'); // => 'C'
 * ```
 * @validator isGt
 */
export function isGt<T extends range.Input>(
  minValue: T,
  options?: isGt.Options,
): Validator {
  return validator<T>(
    isGt.name,
    (input: T, context: Context, _this): Nullish<T> => {
      if (
        (typeof minValue === 'number' || typeof minValue === 'bigint') &&
        (typeof input === 'number' || typeof input === 'bigint') &&
        input > minValue
      ) {
        return input;
      }
      if (
        minValue instanceof Date &&
        input instanceof Date &&
        input > minValue
      ) {
        return input;
      }
      if (
        typeof minValue === 'string' &&
        typeof input === 'string' &&
        (input > minValue ||
          (options?.caseInsensitive &&
            input.toLowerCase() > minValue.toLowerCase()))
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be greater than ${typeof minValue === 'string' ? `"${minValue}"` : minValue}`,
        input,
      );
    },
    options,
  );
}

export namespace isGt {
  export interface Options extends ValidationOptions {
    /**
     * For string comparisons, also passes if the lower-cased input is
     * greater than the lower-cased `minValue` (in addition to the
     * case-sensitive comparison).
     * @defaultValue false
     */
    caseInsensitive?: boolean;
  }
}
