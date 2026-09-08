import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import type { range } from './range.js';

/**
 * Checks if value is greater than "minValue"
 * @validator isGt
 */
export function isGt<T extends range.Input>(
  minValue: T,
  options?: isGt.Options,
): Validator {
  return validator<T>(
    isGt.name,
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

export namespace isGt {
  export interface Options extends ValidationOptions {
    caseInsensitive?: boolean;
  }
}
