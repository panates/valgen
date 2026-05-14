import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Check if the string is a hexadecimal number.
 * @validator isHex
 */
export function isHex(options?: isHex.Options) {
  return validator<string, string>(
    isHex.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isHexadecimal(input)) {
        return input;
      }
      context.fail(_this, `Value must be an hexadecimal string`, input);
    },
    options,
  );
}

export namespace isHex {
  export interface Options extends ValidationOptions {}
}
