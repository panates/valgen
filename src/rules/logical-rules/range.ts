import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Checks that the value is between `minValue` and `maxValue`, inclusive on
 * both ends. Supports `number`, `bigint`, `Date`, and `string` comparisons.
 * Despite the `Nullish<T>` return type, there is **no** null/undefined
 * passthrough here - nullish input falls through every branch and fails.
 * Unlike `isGt`/`isGte`/`isLt`/`isLte`, numbers and bigints are not mixed
 * across `input`/`minValue`/`maxValue` here - all three must independently
 * be a number or a bigint - and there is no `caseInsensitive` option for
 * string comparisons.
 *
 * @typeParam T - The type of `minValue`/`maxValue` (`range.Input`:
 * `number | bigint | Date | string`).
 * @param minValue - The lower bound (inclusive).
 * @param maxValue - The upper bound (inclusive).
 * @param options - Validation options (`onFail`, `coerce`, ...).
 * @returns The input value unchanged when `minValue <= input <= maxValue`.
 * @throws `Value must be between <minValue> and <maxValue>` (values
 * interpolated directly, not quoted even for strings) if the input is out
 * of bounds, or if its type doesn't match `minValue`/`maxValue`.
 * @example
 * ```ts
 * vg.range(5, 10)(7); // => 7
 * vg.range(5, 10)(4); // throws ValidationError: "Value must be between 5 and 10"
 * ```
 * @validator range
 */
export function range<T extends range.Input>(
  minValue: T,
  maxValue: T,
  options?: range.Options,
) {
  return validator<T>(
    range.name,
    (input: range.Input, context: Context, _this): Nullish<T> => {
      if (
        (typeof minValue === 'number' || typeof minValue === 'bigint') &&
        (typeof maxValue === 'number' || typeof maxValue === 'bigint') &&
        (typeof input === 'number' || typeof input === 'bigint') &&
        input >= minValue &&
        input <= maxValue
      ) {
        return input as T;
      }
      if (
        minValue instanceof Date &&
        maxValue instanceof Date &&
        input instanceof Date &&
        input >= minValue &&
        input <= maxValue
      ) {
        return input as T;
      }
      if (
        typeof minValue === 'string' &&
        typeof maxValue === 'string' &&
        typeof input === 'string' &&
        input >= minValue &&
        input <= maxValue
      ) {
        return input as T;
      }
      context.fail(
        _this,
        `Value must be between ${minValue} and ${maxValue}`,
        input,
      );
    },
    options,
  );
}

export namespace range {
  /** The value types `range` (and `isGt`/`isGte`/`isLt`/`isLte`) support comparing. */
  export type Input = number | bigint | Date | string;
  /** Options for {@link range} - a plain alias for `ValidationOptions`, adding no extra properties. */
  export type Options = ValidationOptions;
}
