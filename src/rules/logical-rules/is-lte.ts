import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';
import type { range } from './range.js';

/**
 * Checks if the value is lover than or equal to maxValue
 * @validator isLte
 */
export function isLte<T extends range.Input>(
  maxValue: T,
  options?: isLte.Options,
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

export namespace isLte {
  export interface Options extends ValidationOptions {
    caseInsensitive?: boolean;
  }
}
