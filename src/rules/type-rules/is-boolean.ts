import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

const TRUE_PATTERN = /^(?:true|t|1|yes|y)$/i;
const FALSE_PATTERN = /^(?:false|f|0|no|n)$/i;

/**
 * Validates that the value is a `boolean`. With `coerce: true`, converts
 * `1`/`0` and common boolean-like strings (`'true'`, `'yes'`, `'false'`,
 * `'no'`, etc., case-insensitive) into `true`/`false`.
 * @validator isBoolean
 * @param options - Validation options.
 * @returns The validated (and possibly coerced) `boolean` value.
 * @throws `Value must be a boolean` if the input is not an actual `boolean`
 *   and cannot be coerced.
 * @throws `Invalid boolean string` if `coerce: true` and a string input
 *   matches neither the true nor the false pattern.
 * @example
 * ```ts
 * import { isBoolean } from 'valgen';
 *
 * isBoolean(true); // => true
 * isBoolean(1, { coerce: true }); // => true
 * isBoolean('yes', { coerce: true }); // => true
 * ```
 */
export function isBoolean(options?: isBoolean.Options) {
  return validator<boolean | undefined, unknown>(
    isBoolean.name,
    (input: unknown, context: Context, _this): Nullish<boolean> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && typeof output !== 'boolean' && coerce) {
        if (typeof input === 'string') {
          if (TRUE_PATTERN.test(input)) return true;
          if (FALSE_PATTERN.test(input)) return false;
          throw new TypeError(`Invalid boolean string`);
        }
        if (input === 1 || input === 0) output = !!input;
      }
      if (typeof output === 'boolean') return output;
      context.fail(_this, `Value must be a boolean`, input);
    },
    options,
  );
}

export namespace isBoolean {
  export interface Options extends ValidationOptions {}
}
