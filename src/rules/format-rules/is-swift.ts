import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid BIC (Bank Identification Code) or SWIFT
 * code, by delegating to `validatorJS.isBIC(input)`.
 *
 * @param options - Validation options.
 * @returns The validated BIC/SWIFT code string, unchanged.
 * @throws `Value must be a valid BIC (Bank Identification Code) or SWIFT code`
 *   when the input isn't a valid BIC/SWIFT code.
 *
 * @example
 * ```ts
 * import { isSWIFT } from 'valgen';
 *
 * isSWIFT('DEUTDEFF500'); // => 'DEUTDEFF500'
 * isSWIFT('1234DEFF'); // throws ValidationError: "Value must be a valid BIC (Bank Identification Code) or SWIFT code"
 * ```
 * @validator isSWIFT
 */
export function isSWIFT(options?: isSWIFT.Options) {
  return validator<string, string>(
    isSWIFT.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isBIC(input)) return input;
      context.fail(
        _this,
        `Value must be a valid BIC (Bank Identification Code) or SWIFT code`,
        input,
      );
    },
    options,
  );
}

export namespace isSWIFT {
  export interface Options extends ValidationOptions {}
}
