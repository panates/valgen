import validatorJS, {
  type IsCreditCardOptions as _IsCreditCardOptions,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid credit card number (Luhn checksum plus
 * an optional provider-specific pattern). Delegates to
 * `validatorJS.isCreditCard(input, options)`.
 * @validator isCreditCard
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a valid credit card number: `Value must be a valid Credit Card number`
 * @example
 * ```ts
 * isCreditCard('4111111111111111'); // => '4111111111111111'
 * isCreditCard('4111111111111112'); // throws ValidationError: "Value must be a valid Credit Card number"
 * ```
 */
export function isCreditCard(options?: isCreditCard.Options) {
  return validator<string, string>(
    isCreditCard.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        typeof input === 'string' &&
        validatorJS.isCreditCard(input, options)
      ) {
        return input;
      }
      context.fail(_this, `Value must be a valid Credit Card number`, input);
    },
    options,
  );
}

export namespace isCreditCard {
  export interface Options extends ValidationOptions, _IsCreditCardOptions {
    /**
     * Restricts validation to a specific card provider/network.
     * @defaultValue undefined
     */
    provider?: Provider;
  }

  export type Provider = _IsCreditCardOptions['provider'];
}
