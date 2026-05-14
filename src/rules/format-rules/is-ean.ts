import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is an EAN (European Article Number)
 * @validator isEAN
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
