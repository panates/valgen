import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Check if the string contains only letters and numbers.
 * @validator isAlphanumeric
 */
export function isAlphanumeric(options?: isAlphanumeric.Options) {
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

export namespace isAlphanumeric {
  export interface Options extends ValidationOptions {}
}
