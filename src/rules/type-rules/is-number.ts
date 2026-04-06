import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if the value is a number.
 * Converts input value to number if the coerce option is set to 'true'.
 * @validator isNumber
 */
export function isNumber(options?: isNumber.Options) {
  return validator<number, unknown>(
    'isNumber',
    (input: unknown, context: Context, _this): Nullish<number> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && typeof output !== 'number' && coerce) {
        if (typeof input === 'string') output = parseFloat(input);
        else if (typeof input === 'bigint') {
          output = Number(input);
          if (input === BigInt(output)) return output;
        }
      }

      if (typeof output === 'number' && !isNaN(output)) return output;
      context.fail(_this, `Value must be a number`, input);
    },
    options,
  );
}

export namespace isNumber {
  export interface Options extends ValidationOptions {}
}
