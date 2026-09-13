import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is exactly `null`; even `undefined` fails.
 * @validator isNull
 * @param options - Validation options.
 * @returns `null`.
 * @throws `Value must be null` if the input is anything other than `null`.
 * @example
 * ```ts
 * import { isNull } from 'valgen';
 *
 * isNull(null); // => null
 * isNull(undefined); // throws ValidationError: 'Value must be null'
 * ```
 */
export function isNull(options?: isNull.Options) {
  return validator<null, unknown>(
    isNull.name,
    (input: unknown, context: Context, _this) => {
      if (input === null) return input;
      context.fail(_this, `Value must be null`, input);
    },
    options,
  );
}

export namespace isNull {
  export interface Options extends ValidationOptions {}
}

/**
 * Validates that the value is anything other than `null` - notably,
 * `undefined`, `''`, `0`, and `NaN` all pass.
 * @validator isNotNull
 * @param options - Validation options.
 * @returns The input value, unchanged.
 * @throws `Value is null` if the input is `null`.
 * @example
 * ```ts
 * import { isNotNull } from 'valgen';
 *
 * isNotNull(undefined); // => undefined
 * isNotNull(0); // => 0
 * isNotNull(null); // throws ValidationError: 'Value is null'
 * ```
 */
export function isNotNull(options?: isNotNull.Options) {
  return validator(
    isNotNull.name,
    (input: unknown, context: Context, _this) => {
      if (input !== null) return input;
      context.fail(_this, `{{label}} is null`, input);
    },
    options,
  );
}

export namespace isNotNull {
  export interface Options extends ValidationOptions {}
}

/**
 * Validates that the value is `null` or `undefined`.
 * @validator isNullish
 * @param options - Validation options.
 * @returns The input value (`null` or `undefined`), unchanged.
 * @throws `Value is not nullish` if the input is anything other than
 *   `null` or `undefined`.
 * @example
 * ```ts
 * import { isNullish } from 'valgen';
 *
 * isNullish(null); // => null
 * isNullish(undefined); // => undefined
 * isNullish(''); // throws ValidationError: 'Value is not nullish'
 * ```
 */
export function isNullish(options?: isNullish.Options) {
  return validator<null, unknown>(
    isNullish.name,
    (input: unknown, context: Context, _this) => {
      if (input == null) return input;
      context.fail(_this, `{{label}} is not nullish`, input);
    },
    options,
  );
}

export namespace isNullish {
  export interface Options extends ValidationOptions {}
}

/**
 * Validates that the value is neither `null` nor `undefined` - `0`, `''`,
 * and `NaN` all pass.
 * @validator isNotNullish
 * @param options - Validation options.
 * @returns The input value, unchanged.
 * @throws `Value is null` if the input is `null`.
 * @throws `Value is undefined` if the input is `undefined`.
 * @example
 * ```ts
 * import { isNotNullish } from 'valgen';
 *
 * isNotNullish(0); // => 0
 * isNotNullish(null); // throws ValidationError: 'Value is null'
 * isNotNullish(undefined); // throws ValidationError: 'Value is undefined'
 * ```
 */
export function isNotNullish(options?: isNotNullish.Options) {
  return validator(
    isNotNullish.name,
    (input: unknown, context: Context, _this) => {
      if (input != null) return input;
      if (input === null) context.fail(_this, `{{label}} is null`, input);
      else context.fail(_this, `{{label}} is undefined`, input);
    },
    options,
  );
}

export namespace isNotNullish {
  export interface Options extends ValidationOptions {}
}
