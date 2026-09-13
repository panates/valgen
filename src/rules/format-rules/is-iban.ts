import validatorJS, {
  type IBANLocale as _IBANLocale,
  type IsIBANOptions as _IsIBANOptions,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid IBAN (International Bank Account
 * Number). Delegates to `validatorJS.isIBAN(input, options)`, which checks
 * structure and the mod-97 checksum for the country.
 * @validator isIBAN
 * @param options - Validation options, including `whitelist`/`blacklist`
 *   country restrictions.
 * @returns The validated IBAN string, unchanged.
 * @throws `Value must be a valid IBAN (International Bank Account Number)`
 *   when the input is not a string, fails the checksum, or is excluded by
 *   `whitelist`/`blacklist`.
 * @example
 * ```ts
 * import { isIBAN, vg } from 'valgen';
 *
 * isIBAN('DE89370400440532013000'); // => 'DE89370400440532013000'
 * isIBAN('DE89370400440532013001'); // throws ValidationError: "Value must be a valid IBAN (International Bank Account Number)"
 *
 * const deOnly = vg.isIBAN({ whitelist: ['DE'] });
 * deOnly('DE89370400440532013000'); // => 'DE89370400440532013000'
 * ```
 */
export function isIBAN(options?: isIBAN.Options) {
  return validator<string, string>(
    isIBAN.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isIBAN(input, options))
        return input;
      context.fail(
        _this,
        `Value must be a valid IBAN (International Bank Account Number)`,
        input,
      );
    },
    options,
  );
}

export namespace isIBAN {
  export interface Options extends ValidationOptions, _IsIBANOptions {
    /**
     * Only accept IBANs from these country codes.
     *
     * @defaultValue undefined
     */
    whitelist?: IBANLocale[];

    /**
     * Reject IBANs from these country codes.
     *
     * @defaultValue undefined
     */
    blacklist?: IBANLocale[];
  }

  export type IBANLocale = _IBANLocale;
}
