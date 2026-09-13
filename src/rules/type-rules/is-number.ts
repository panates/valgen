import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is a `number`. With `coerce: true`, allows
 * parsing a `string` (via `parseFloat`) or converting a lossless `bigint`
 * into a `number`.
 * @validator isNumber
 * @param options - Validation options.
 * @returns The validated (and possibly coerced) `number`.
 * @throws `Value must be a number` if the input is `NaN`, `null`,
 *   `undefined`, or (without coercion, or when coercion would lose
 *   precision for a `bigint`) not a finite `number`.
 * @example
 * ```ts
 * import { isNumber } from 'valgen';
 *
 * isNumber(1.1); // => 1.1
 * isNumber('4.5', { coerce: true }); // => 4.5
 * isNumber(10000000000000000001n, { coerce: true });
 * // throws: 'Value must be a number' (precision would be lost)
 * ```
 */
export function isNumber(options?: isNumber.Options) {
  return validator<number, unknown>(
    isNumber.name,
    (input: unknown, context: Context, _this): Nullish<number> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && typeof output !== 'number' && coerce) {
        if (typeof input === 'string') output = parseFloat(input);
        else if (typeof input === 'bigint') {
          const n = Number(input);
          if (input !== BigInt(n)) {
            context.fail(_this, `Value must be a number`, input);
            return;
          }
          output = n;
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
