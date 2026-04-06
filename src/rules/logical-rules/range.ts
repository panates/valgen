import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Checks if value is between minValue and maxValue
 * @validator range
 */
export function range<T extends range.Input>(
  minValue: T,
  maxValue: T,
  options?: range.Options,
) {
  return validator<T>(
    'range',
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
  export type Input = number | bigint | Date | string;
  export type Options = ValidationOptions;
}
