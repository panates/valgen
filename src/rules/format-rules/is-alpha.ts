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
export function isAlpha(options?: isAlpha.Options) {
  return validator<string, string>(
    'isAlpha',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isAlpha(input)) return input;
      context.fail(_this, `"Value must be an alpha string`, input);
    },
    options,
  );
}

export namespace isAlpha {
  export interface Options extends ValidationOptions {}
}
