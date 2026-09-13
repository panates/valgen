import validatorJS, {
  type IsMobilePhoneOptions as _IsMobilePhoneOptions,
  type MobilePhoneLocale as _MobilePhoneLocale,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid mobile phone number. Delegates to
 * `validatorJS.isMobilePhone(input, options.locale, { strictMode })`.
 * @validator isMobilePhone
 * @param options - Validation options.
 * @returns The validated mobile phone number string, unchanged.
 * @throws `Value must be a valid Mobile Phone Number` when the input is not
 *   a string, or is not a valid mobile phone number for the requested
 *   locale(s)/strictness.
 * @example
 * ```ts
 * import { isMobilePhone, vg } from 'valgen';
 *
 * isMobilePhone('+14155552671'); // => '+14155552671'
 * isMobilePhone('12345'); // throws ValidationError: "Value must be a valid Mobile Phone Number"
 *
 * const trStrict = vg.isMobilePhone({ locale: 'tr-TR', strictMode: true });
 * trStrict('+905321234567'); // => '+905321234567'
 * ```
 */
export function isMobilePhone(options?: isMobilePhone.Options) {
  const opts: _IsMobilePhoneOptions = {
    strictMode: options?.strictMode,
  };
  return validator<string, string>(
    isMobilePhone.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        typeof input === 'string' &&
        validatorJS.isMobilePhone(input, options?.locale, opts)
      ) {
        return input;
      }
      context.fail(_this, `Value must be a valid Mobile Phone Number`, input);
    },
    options,
  );
}

export namespace isMobilePhone {
  export interface Options extends ValidationOptions {
    /**
     * If this is set to `true`, the mobile phone number must be supplied with the country code and therefore must start with `+`.
     *
     * @defaultValue false
     */
    strictMode?: boolean;

    /**
     * Locale or locales of the mobile phone
     * @defaultValue 'any'
     */
    locale?: 'any' | MobilePhoneLocale | MobilePhoneLocale[];
  }

  export type MobilePhoneLocale = _MobilePhoneLocale;
}
