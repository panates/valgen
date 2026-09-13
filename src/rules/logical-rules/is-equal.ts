import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is strictly equal (`===`) to `compare`.
 * `null`/`undefined` input is always passed through unchanged, regardless of
 * `compare`.
 *
 * @typeParam T - The type of `compare`.
 * @param compare - The value the input must strictly equal.
 * @param options - Validation options (`onFail`, `coerce`, ...).
 * @returns The input value unchanged when it strictly equals `compare` (or
 * is nullish).
 * @throws `Value must be equal to "<compare>"` if `input !== compare`.
 * @example
 * ```ts
 * vg.isEqual('a')('a'); // => 'a'
 * vg.isEqual('a')('b'); // throws ValidationError: "Value must be equal to..."
 * ```
 * @validator isEqual
 */
export function isEqual<T>(compare: T, options?: isEqual.Options) {
  return validator<any, any>(
    isEqual.name,
    (input: unknown, context: Context, _this) => {
      if (input == null) return input;
      if (input !== compare)
        context.fail(_this, `Value must be equal to "${compare}"`, input);
      return input;
    },
    options,
  );
}

export namespace isEqual {
  /** Options for {@link isEqual} - adds no properties beyond `ValidationOptions`. */
  export interface Options extends ValidationOptions {}
}

/**
 * Validates that the value is not strictly equal (`===`) to `compare`.
 * `null`/`undefined` input is always passed through unchanged, regardless of
 * `compare`.
 *
 * @param compare - The value the input must not strictly equal.
 * @param options - Validation options (`onFail`, `coerce`, ...).
 * @returns The input value unchanged when it does not strictly equal
 * `compare` (or is nullish).
 * @throws `Value must not be equal to "<compare>"` if `input === compare`.
 * @example
 * ```ts
 * vg.isNotEqual('a')('b'); // => 'b'
 * vg.isNotEqual('a')('a'); // throws ValidationError: "Value must not be equal to..."
 * ```
 * @validator isNotEqual
 */
export function isNotEqual(compare: any, options?: isNotEqual.Options) {
  return validator<any, any>(
    isNotEqual.name,
    (input: unknown, context: Context, _this) => {
      if (input == null) return input;
      if (input === compare) {
        context.fail(_this, `Value must not be equal to "${compare}"`, input);
      }
      return input;
    },
    options,
  );
}

export namespace isNotEqual {
  /** Options for {@link isNotEqual} - adds no properties beyond `ValidationOptions`. */
  export interface Options extends ValidationOptions {}
}
