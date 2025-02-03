import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Check if the string contains only letters (a-zA-Z).
 * @validator isAlpha
 */
export function isAlpha(options?: ValidationOptions) {
  return validator<string, string>(
    'isLowercase',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isAlpha(input)) return input;
      context.fail(_this, `"Value must be an alpha string`, input);
    },
    options,
  );
}

/**
 * Check if the string contains only letters and numbers.
 * @validator isAlphanumeric
 */
export function isAlphanumeric(options?: ValidationOptions) {
  return validator<string, string>(
    'isAlphanumeric',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isAlphanumeric(input)) {
        return input;
      }
      context.fail(_this, `"Value must be an alphanumeric string`, input);
    },
    options,
  );
}
