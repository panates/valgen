import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is an ETH (Ethereum) address.
 * @validator isETHAddress
 */
export function isETHAddress(options?: isETHAddress.Options) {
  return validator<string, string>(
    'isETHAddress',
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
