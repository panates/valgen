import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value a Lowercase string
 * @validator isLowercase
 */
export function isLowercase(options?: isLowercase.Options) {
  return validator<string, string>(
    'isLowercase',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isLowercase(input)) {
        return input;
      }
      context.fail(_this, `Value must be a lowercase string`, input);
    },
    options,
  );
}

export namespace isLowercase {
  export interface Options extends ValidationOptions {}
}
