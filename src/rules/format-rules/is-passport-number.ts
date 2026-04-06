import validatorJS, { PostalCodeLocale } from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a passport number
 * @validator isPassportNumber
 */
export function isPassportNumber(
  countryCode: isPassportNumber.Locale,
  options?: isPassportNumber.Options,
) {
  return validator<string, string>(
    'isPassportNumber',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        typeof input === 'string' &&
        validatorJS.isPassportNumber(input, countryCode)
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be a valid ${countryCode} PassportNumber)`,
        input,
      );
    },
    options,
  );
}

export namespace isPassportNumber {
  export interface Options extends ValidationOptions {}
  export type Locale = PostalCodeLocale;
}
