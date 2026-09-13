import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import type { range } from './range.js';

/**
 * Checks that the value is lower than or equal to `maxValue`. Supports
 * `number`, `bigint`, `Date`, and `string` comparisons. Despite the
 * `Nullish<T>` return type, there is **no** null/undefined passthrough here
 * - nullish input falls through every branch and fails. This validator is
 * also reused internally by `lengthMax` via
 * `pipe([getLength(), isLte(maxValue, { onFail: ... })])`.
 *
 * @typeParam T - The type of `maxValue` (`range.Input`: `number | bigint | Date | string`).
 * @param maxValue - The value the input must be lower than or equal to.
 * @param options - Validation options, including `caseInsensitive` for
 * string comparisons.
 * @returns The input value unchanged when it is `<= maxValue`.
 * @throws `Value must be lower than or equal to <maxValue>` (string
 * `maxValue` quoted) if the comparison fails, or if `input`/`maxValue` are
 * not a matching comparable type.
 * @example
 * ```ts
 * vg.isLte(5)(5); // => 5
 * vg.isLte(5)(6); // throws ValidationError: "...must be lower than or equal to 5"
 * ```
 * @validator isLte
 */
export function isLte<T extends range.Input>(
  maxValue: T,
  options?: isLte.Options,
): Validator {
  return validator<T>(
    isLte.name,
    (input: T, context: Context, _this): Nullish<T> => {
      if (
        (typeof maxValue === 'number' || typeof maxValue === 'bigint') &&
        (typeof input === 'number' || typeof input === 'bigint') &&
        input <= maxValue
      ) {
        return input;
      }
      if (
        maxValue instanceof Date &&
        input instanceof Date &&
        input <= maxValue
      ) {
        return input;
      }
      if (
        typeof maxValue === 'string' &&
        typeof input === 'string' &&
        (input <= maxValue ||
          (options?.caseInsensitive &&
            input.toLowerCase() <= maxValue.toLowerCase()))
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be lower than or equal to ${typeof maxValue === 'string' ? `"${maxValue}"` : maxValue}`,
        input,
      );
    },
    options,
  );
}

export namespace isLte {
  export interface Options extends ValidationOptions {
    /**
     * For string comparisons, also passes if the lower-cased input is `<=`
     * the lower-cased `maxValue`.
     * @defaultValue false
     */
    caseInsensitive?: boolean;
  }
}
