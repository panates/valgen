import validatorJS, {
  type IsMACAddressOptions as _IsMACAddressOptions,
} from '@browsery/validator';
import { type Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid MAC address. Delegates to
 * `validatorJS.isMACAddress(input, { no_separators, eui })`.
 * @validator isMACAddress
 * @param options - Validation options.
 * @returns The validated MAC address string, unchanged.
 * @throws `Value must be a valid MAC address` when the input is not a
 *   string, or does not match the requested MAC address format.
 * @example
 * ```ts
 * import { isMACAddress, vg } from 'valgen';
 *
 * isMACAddress('01:02:03:04:05:ab'); // => '01:02:03:04:05:ab'
 * isMACAddress('0102030405ab'); // throws ValidationError: "Value must be a valid MAC address"
 *
 * const noSeparators = vg.isMACAddress({ noSeparators: true });
 * noSeparators('0102030405ab'); // => '0102030405ab'
 * ```
 */
export function isMACAddress(options?: isMACAddress.Options) {
  const opts: _IsMACAddressOptions = {
    no_separators: options?.noSeparators,
    eui: options?.eui,
  };
  return validator<string, string>(
    isMACAddress.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isMACAddress(input, opts)
      ) {
        return input;
      }
      context.fail(_this, `Value must be a valid MAC address`, input);
    },
    options,
  );
}

export namespace isMACAddress {
  export interface Options extends ValidationOptions {
    /**
     * If set to `true`, the validator will allow MAC addresses without the colons.
     * Also, it allows the use of hyphens or spaces.
     *
     * e.g. `01 02 03 04 05 ab` or `01-02-03-04-05-ab`.
     *
     * @defaultValue false
     */
    noSeparators?: boolean;

    /**
     * Setting `eui` allows for validation against EUI-48 or EUI-64 instead of both.
     *
     * @defaultValue undefined
     */
    eui?: '48' | '64';
  }
}
