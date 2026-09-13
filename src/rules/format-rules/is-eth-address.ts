import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid Ethereum (ETH) address. Delegates to
 * `validatorJS.isEthereumAddress`.
 * @validator isETHAddress
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a valid ETH address: `Value must be valid ETH (Ethereum) address`
 * @example
 * ```ts
 * isETHAddress('0xb794f5ea0ba39494ce839613fffba74279579268'); // => '0xb794f5ea0ba39494ce839613fffba74279579268'
 * isETHAddress('0xnothex'); // throws ValidationError: "Value must be valid ETH (Ethereum) address"
 * ```
 */
export function isETHAddress(options?: isETHAddress.Options) {
  return validator<string, string>(
    isETHAddress.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isEthereumAddress(input)) {
        return input;
      }
      context.fail(_this, `Value must be valid ETH (Ethereum) address`, input);
    },
    options,
  );
}

export namespace isETHAddress {
  export interface Options extends ValidationOptions {}
}
