import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is a `bigint`. With `coerce: true`, allows
 * converting a `number` or a numeric `string` to `bigint` via
 * `BigInt(input)`.
 * @validator isBigint
 * @param options - Validation options.
 * @returns The `bigint` value.
 * @throws `Value must be a BigInt` if the input is not a `bigint` (and,
 *   with `coerce`, cannot be converted into one via `BigInt(input)`).
 * @example
 * ```ts
 * import { isBigint } from 'valgen';
 *
 * isBigint(1n); // => 1n
 * isBigint('4', { coerce: true }); // => 4n
 * ```
 */
export function isBigint(options?: isBigint.Options) {
  return validator<bigint, unknown>(
    isBigint.name,
    (input: unknown, context: Context, _this): Nullish<bigint> => {
      const coerce = options?.coerce ?? context.coerce;
      if (typeof input === 'bigint') return input;
      if (coerce && (typeof input === 'number' || typeof input === 'string')) {
        try {
          return BigInt(input);
        } catch {
          // falls through to context.fail below
        }
      }
      context.fail(_this, `Value must be a BigInt`, input);
    },
    options,
  );
}

export namespace isBigint {
  export interface Options extends ValidationOptions {}
}
