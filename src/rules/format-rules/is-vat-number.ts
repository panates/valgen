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
 * Validates that a string is a valid VAT (Value Added Tax) number for the
 * given EU country code, by delegating to `validatorJS.isVAT(input, countryCode)`.
 *
 * @param countryCode - The EU VAT country code to validate the number against
 *   (e.g. `'AT'`, `'BE'`, `'BG'`, ...).
 * @param options - Validation options.
 * @returns The validated VAT number string, unchanged.
 * @throws `Value must be a valid VAT number` when the input isn't a valid VAT
 *   number for `countryCode`.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * const isATVat = vg.isVATNumber('AT');
 * isATVat('ATU12345678'); // => 'ATU12345678'
 * isATVat('12345'); // throws ValidationError: "Value must be a valid VAT number"
 * ```
 * @validator isVATNumber
 */
export function isVATNumber(
  countryCode: isVATNumber.CountryCode,
  options?: isVATNumber.Options,
) {
  return validator<string, string>(
    isVATNumber.name,
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
