import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid Bitcoin (BTC) address. Delegates to
 * `validatorJS.isBtcAddress`.
 * @validator isBtcAddress
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a valid BTC address: `Value must be a valid BTC address`
 * @example
 * ```ts
 * isBtcAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'); // => '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
 * isBtcAddress('notabtcaddress'); // throws ValidationError: "Value must be a valid BTC address"
 * ```
 */
export function isBtcAddress(options?: isBtcAddress.Options) {
  return validator<string, string>(
    isBtcAddress.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isBtcAddress(input)) {
        return input;
      }
      context.fail(_this, `Value must be a valid BTC address`, input);
    },
    options,
  );
}

export namespace isBtcAddress {
  export interface Options extends ValidationOptions {}
}
