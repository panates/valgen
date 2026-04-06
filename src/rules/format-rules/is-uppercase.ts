import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value a Uppercase string
 * @validator isUppercase
 */
export function isUppercase(options?: isUppercase.Options) {
  return validator<string, string>(
    'isUppercase',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isUppercase(input)) {
        return input;
      }
      context.fail(_this, `Value must be an uppercase string`, input);
    },
    options,
  );
}

export namespace isUppercase {
  export interface Options extends ValidationOptions {}
}
