import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a BIC (Bank Identification Code) or SWIFT code
 * @validator isSWIFT
 */
export function isSWIFT(options?: isSWIFT.Options) {
  return validator<string, string>(
    'isSWIFT',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isBIC(input)) return input;
      context.fail(
        _this,
        `Value must be a valid a BIC (Bank Identification Code) or SWIFT code`,
        input,
      );
    },
    options,
  );
}

export namespace isSWIFT {
  export interface Options extends ValidationOptions {}
}
