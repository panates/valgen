import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Wraps a rule so that `null`/`undefined` input fails (or falls back to a
 * default) before being handed to the nested rule.
 *
 * If `input == null` (i.e. `null` or `undefined`) and `options.default` is
 * set, `input` is replaced with `options.default`. If, after that
 * substitution, `input` is still `null`/`undefined` (no default was
 * configured, or the default itself is nullish), it fails with
 * `Value required`. Otherwise, delegates to `nested(input)` - so a
 * configured `default` must itself satisfy the nested rule, or validation
 * still fails (just with the nested rule's own error instead of
 * `Value required`).
 *
 * @typeParam T - The nested validator's output type.
 * @typeParam I - The nested validator's input type.
 * @param nested - The validator to delegate to once the input is non-nullish.
 * @param options - Validation options, including {@link RequiredValidatorOptions.default}.
 * @returns A validator that returns the nested rule's result for a
 *   non-nullish (or defaulted) input.
 * @throws {@link ValidationError} with `Value required` when the input is
 *   `null`/`undefined` and no usable default is configured; otherwise
 *   whatever `nested` throws.
 *
 * @example
 * ```ts
 * import { isString, vg } from 'valgen';
 *
 * vg.required(isString)(''); // => ''
 * vg.required(isString)(undefined); // throws: "Value required"
 *
 * // with a default value, substituted (and still validated) when input is nullish
 * vg.required(isString, { default: 'hello world' })(undefined); // => 'hello world'
 * ```
 * @validator required
 */
export function required<T, I>(
  nested: Validator<T, I>,
  options?: RequiredValidatorOptions,
) {
  return validator<Nullish<T>, I>(
    required.name,
    (input: I, context: Context, _this): Nullish<T> => {
      if (input == null) input = options?.default;
      if (input == null) {
        context.fail(_this, `Value required`, input);
        return;
      }
      return nested(input, undefined, context) as T;
    },
    options,
  );
}

/** Options accepted by {@link required}. */
export interface RequiredValidatorOptions extends ValidationOptions {
  /**
   * Value substituted when `input` is `null` or `undefined`. The substituted
   * default is then still run through the nested rule like any other input -
   * it is not returned raw.
   * @defaultValue undefined
   */
  default?: any;
}
