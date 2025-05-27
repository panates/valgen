import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

export interface IsTimeOptions
  extends ValidationOptions,
    validatorJS.IsTimeOptions {}

/**
 * Validates if value is a time formatted string
 * @validator isTime
 */
export function isTime(options?: IsTimeOptions) {
  return validator<string, string>(
    'isURL',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isTime(input, options)
      ) {
        return input;
      }
      context.fail(_this, `Value must be a valid Time`, input);
    },
    options,
  );
}
