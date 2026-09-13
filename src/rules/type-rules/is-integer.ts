import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is an integer `number`. With `coerce: true`,
 * allows parsing a `string` (via `parseFloat`) or converting a lossless
 * `bigint` into an integer `number`.
 * @validator isInteger
 * @param options - Validation options.
 * @returns The validated (and possibly coerced) integer `number`.
 * @throws `Value must be a valid integer value` if the input is `NaN`, a
 *   non-integer float, or (without coercion, or when coercion would lose
 *   precision for a `bigint`) not an integer `number`.
 * @example
 * ```ts
 * import { isInteger } from 'valgen';
 *
 * isInteger(1); // => 1
 * isInteger('4', { coerce: true }); // => 4
 * isInteger(10000000000000000001n, { coerce: true });
 * // throws: 'Value must be a valid integer value' (precision would be lost)
 * ```
 */
export function isInteger(options?: isInteger.Options) {
  return validator<number, unknown>(
    isInteger.name,
    (input: unknown, context: Context, _this): Nullish<number> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && typeof output !== 'number' && coerce) {
        if (typeof input === 'string') output = parseFloat(input);
        else if (typeof input === 'bigint') {
          const n = Number(input);
          if (input !== BigInt(n)) {
            context.fail(_this, `Value must be a valid integer value`, input);
            return;
          }
          output = n;
        }
      }
      if (
        typeof output === 'number' &&
        !isNaN(output) &&
        Number.isInteger(output)
      ) {
        return output;
      }
      context.fail(_this, `Value must be a valid integer value`, input);
    },
    options,
  );
}

export namespace isInteger {
  export interface Options extends ValidationOptions {}
}
