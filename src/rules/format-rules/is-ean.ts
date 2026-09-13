import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is a valid EAN (European Article Number).
 * Delegates to `validatorJS.isEAN(input)` (checksum-validated EAN-8/EAN-13
 * style codes).
 * @validator isEAN
 * @param options - Validation options.
 * @returns The input string, unchanged, if valid.
 * @throws if `input` is not a valid EAN: `Value must be a valid EAN (European Article Number)`
 * @example
 * ```ts
 * isEAN('4006381333931'); // => '4006381333931'
 * isEAN('1234567890123'); // throws ValidationError: "Value must be a valid EAN (European Article Number)"
 * ```
 */
export function isEAN(options?: isEAN.Options) {
  return validator<string, string>(
    isEAN.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isEAN(input)) return input;
      context.fail(
        _this,
        `Value must be a valid EAN (European Article Number)`,
        input,
      );
    },
    options,
  );
}

export namespace isEAN {
  export interface Options extends ValidationOptions {}
}
