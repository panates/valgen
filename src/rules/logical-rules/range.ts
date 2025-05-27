import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import { allOf } from '../utility-rules/all-of.js';
import { getLength } from '../utility-rules/get-length.js';
import { pipe } from '../utility-rules/pipe.js';

type RangeInput = number | bigint | Date | string;

/**
 * Checks if value is between minValue and maxValue
 * @validator range
 */
export function range<T extends RangeInput>(
  minValue: T,
  maxValue: T,
  options?: ValidationOptions,
) {
  return validator<T>(
    'range',
    (input: RangeInput, context: Context, _this): Nullish<T> => {
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

/**
 * Checks if value is grater than "minValue"
 * @validator iGt
 */
export function isGt<T extends RangeInput>(
  minValue: T,
  options?: ValidationOptions & { caseInsensitive?: boolean },
): Validator {
  return validator<T, T>(
    'isGt',
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

// *************************************************************

/**
 * Checks if value is grater than or equal to minValue
 * @validator isGte
 */
export function isGte<T extends RangeInput>(
  minValue: T,
  options?: ValidationOptions & { caseInsensitive?: boolean },
): Validator<T, T> {
  return validator<T, T>(
    'isGte',
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

// *************************************************************

/**
 * Checks if number value is lover than maxValue
 * @validator isLt
 */
export function isLt<T extends RangeInput>(
  maxValue: T,
  options?: ValidationOptions & { caseInsensitive?: boolean },
): Validator {
  return validator<T, T>(
    'isLt',
    (input: T, context: Context, _this): Nullish<T> => {
      if (
        (typeof maxValue === 'number' || typeof maxValue === 'bigint') &&
        (typeof input === 'number' || typeof input === 'bigint') &&
        input < maxValue
      ) {
        return input;
      }
      if (
        maxValue instanceof Date &&
        input instanceof Date &&
        input < maxValue
      ) {
        return input;
      }
      if (
        typeof maxValue === 'string' &&
        typeof input === 'string' &&
        (input < maxValue ||
          (options?.caseInsensitive &&
            input.toLowerCase() < maxValue.toLowerCase()))
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be lover than ${typeof maxValue === 'string' ? `"${maxValue}"` : maxValue}`,
        input,
      );
    },
    options,
  );
}

// *************************************************************

/**
 * Checks if value is lover than or equal to maxValue
 * @validator isLte
 */
export function isLte<T extends RangeInput>(
  maxValue: T,
  options?: ValidationOptions & { caseInsensitive?: boolean },
): Validator {
  return validator<T, T>(
    'isLte',
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
        `Value must be lover than or equal to ${typeof maxValue === 'string' ? `"${maxValue}"` : maxValue}`,
        input,
      );
    },
    options,
  );
}

/**
 * Checks the length is at least "minValue"
 * @validator lengthMin
 */
export const lengthMin = (minValue: number) =>
  allOf([
    pipe([
      getLength(),
      isGte(minValue, {
        onFail: () => `Value length must be at least ${minValue}`,
      }),
    ]),
  ]);

/**
 * Checks if the length is at most "maxValue"
 * @validator lengthMax
 */
export const lengthMax = (maxValue: number) =>
  allOf([
    pipe([
      getLength(),
      isLte(maxValue, {
        onFail: () => `The length of {{label}} must be at most ${maxValue}`,
      }),
    ]),
  ]);
