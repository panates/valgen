import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is an VAT number
 * @validator isVAT
 */
export function isVATNumber(countryCode: string, options?: ValidationOptions) {
  return validator<string, string>(
    'isVATNumber',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isVAT(input, countryCode)) {
        return input;
      }
      context.fail(_this, `Value must be a valid VAT number`, input);
    },
    options,
  );
}
