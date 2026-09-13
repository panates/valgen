import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a value is not `undefined`. Note that `null` is considered
 * defined - use `isNotNullish` to reject both `undefined` and `null`.
 *
 * @param options - Validation options (`onFail`, `coerce`, ...).
 * @returns The input value unchanged as long as it is not `undefined`,
 * including `0`, `''`, and `null`.
 * @throws `Value must be defined` if the input is `undefined`.
 * @example
 * ```ts
 * isDefined(0);          // => 0
 * isDefined(null);       // => null
 * isDefined(undefined);  // throws ValidationError: "Value must be defined"
 * ```
 * @validator isDefined
 */
export function isDefined(options?: isDefined.Options) {
  return validator<any, unknown>(
    isDefined.name,
    (input: unknown, context: Context, _this) => {
      if (input !== undefined) return input;
      context.fail(_this, `Value must be defined`, input);
    },
    options,
  );
}

export namespace isDefined {
  /** Options for {@link isDefined} - adds no properties beyond `ValidationOptions`. */
  export interface Options extends ValidationOptions {}
}
