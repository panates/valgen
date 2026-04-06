import validatorJS, {
  type VATCountryCode as _VATCountryCode,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a VAT number
 * @validator isVAT
 */
export function isVATNumber(
  countryCode: isVATNumber.CountryCode,
  options?: isVATNumber.Options,
) {
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

export namespace isVATNumber {
  export type CountryCode = _VATCountryCode;
  export interface Options extends ValidationOptions {}
}
