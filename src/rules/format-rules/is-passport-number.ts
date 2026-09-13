import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid passport number for the given country,
 * by delegating to `validatorJS.isPassportNumber(input, countryCode)`.
 *
 * @param countryCode - The ISO country code to validate the passport number against.
 * @param options - Validation options.
 * @returns The validated passport number string, unchanged.
 * @throws `Value must be a valid <countryCode> Passport Number` when the input
 *   isn't a valid passport number for `countryCode`.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * const isUSPassport = vg.isPassportNumber('US');
 * isUSPassport('123456789'); // => '123456789'
 * isUSPassport('12345'); // throws ValidationError: "Value must be a valid US Passport Number"
 * ```
 * @validator isPassportNumber
 */
export function isPassportNumber(
  countryCode: string,
  options?: isPassportNumber.Options,
) {
  return validator<string, string>(
    isPassportNumber.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        typeof input === 'string' &&
        validatorJS.isPassportNumber(input, countryCode)
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be a valid ${countryCode} Passport Number`,
        input,
      );
    },
    options,
  );
}

export namespace isPassportNumber {
  export interface Options extends ValidationOptions {}
}
