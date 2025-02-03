import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is an IBAN (International Bank Account Number)
 * @validator isIBAN
 */
export function isIBAN(options?: ValidationOptions) {
  return validator<string, string>(
    'isIBAN',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isIBAN(input)) return input;
      context.fail(
        _this,
        `Value must be a valid IBAN (International Bank Account Number)`,
        input,
      );
    },
    options,
  );
}

/**
 * Validates if value is a BIC (Bank Identification Code) or SWIFT code
 * @validator isSWIFT
 */
export function isSWIFT(options?: ValidationOptions) {
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
