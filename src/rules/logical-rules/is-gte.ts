import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import type { range } from './range.js';

/**
 * Checks that the value is greater than or equal to `minValue`. Supports
 * `number`, `bigint`, `Date`, and `string` comparisons. Despite the
 * `Nullish<T>` return type, there is **no** null/undefined passthrough here
 * - nullish input falls through every branch and fails. This validator is
 * also reused internally by `lengthMin` via
 * `pipe([getLength(), isGte(minValue, { onFail: ... })])`.
 *
 * @typeParam T - The type of `minValue` (`range.Input`: `number | bigint | Date | string`).
 * @param minValue - The value the input must be greater than or equal to.
 * @param options - Validation options, including `caseInsensitive` for
 * string comparisons.
 * @returns The input value unchanged when it is `>= minValue`.
 * @throws `Value must be greater than or equal to <minValue>` (string
 * `minValue` quoted) if the comparison fails, or if `input`/`minValue` are
 * not a matching comparable type.
 * @example
 * ```ts
 * vg.isGte(5)(5); // => 5
 * vg.isGte(5)(4); // throws ValidationError: "...must be greater than or equal to 5"
 * ```
 * @validator isGte
 */
export function isGte<T extends range.Input>(
  minValue: T,
  options?: isGte.Options,
): Validator<T> {
  return validator<T>(
    isGte.name,
    (input: T, context: Context, _this): Nullish<T> => {
      if (
        (typeof minValue === 'number' || typeof minValue === 'bigint') &&
        (typeof input === 'number' || typeof input === 'bigint') &&
        input >= minValue
      ) {
        return input;
      }
      if (
        minValue instanceof Date &&
        input instanceof Date &&
        input >= minValue
      ) {
        return input;
      }
      if (
        typeof minValue === 'string' &&
        typeof input === 'string' &&
        (input >= minValue ||
          (options?.caseInsensitive &&
            input.toLowerCase() >= minValue.toLowerCase()))
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be greater than or equal to ${typeof minValue === 'string' ? `"${minValue}"` : minValue}`,
        input,
      );
    },
    options,
  );
}

export namespace isGte {
  export interface Options extends ValidationOptions {
    /**
     * For string comparisons, also passes if the lower-cased input is `>=`
     * the lower-cased `minValue`.
     * @defaultValue false
     */
    caseInsensitive?: boolean;
  }
}
