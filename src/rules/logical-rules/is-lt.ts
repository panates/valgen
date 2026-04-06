import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import type { range } from './range.js';

/**
 * Checks if the value is lover than maxValue
 * @validator isLt
 */
export function isLt<T extends range.Input>(
  maxValue: T,
  options?: isLt.Options,
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

export namespace isLt {
  export interface Options extends ValidationOptions {
    caseInsensitive?: boolean;
  }
}
