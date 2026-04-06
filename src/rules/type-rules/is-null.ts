import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if the value is "null".
 * @validator isNull
 */
export function isNull(options?: isNull.Options) {
  return validator<null, unknown>(
    'isNull',
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
 * Validates if the value is not "null".
 * @validator isNotNull
 */
export function isNotNull(options?: isNotNull.Options) {
  return validator(
    'isNotNull',
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
 * Validates if the value is "null" or "undefined".
 * @validator isNullish
 */
export function isNullish(options?: isNullish.Options) {
  return validator<null, unknown>(
    'isNullish',
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
 * Validates if the value is not "null" nor "undefined".
 * @validator isNotNullish
 */
export function isNotNullish(options?: isNotNullish.Options) {
  return validator(
    'isNotNullish',
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
