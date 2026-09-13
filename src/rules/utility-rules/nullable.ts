import type { Maybe, Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Wraps a rule so that `null` or `undefined` pass through untouched, and
 * anything else is delegated to the nested rule.
 *
 * If `input == null` (i.e. `null` **or** `undefined`), it is returned as-is
 * without ever calling the nested rule - despite the name, `nullable`
 * tolerates both `null` and `undefined`, not just `null`. For any other
 * input, delegates to `nested(input)` and returns/throws exactly what the
 * nested rule does.
 *
 * @typeParam T - The nested validator's output type.
 * @typeParam I - The nested validator's input type.
 * @param nested - The validator to delegate to for non-nullish input.
 * @param options - Shared validation options (`coerce`, `onFail`); `nullable`
 *   has no options of its own.
 * @returns A validator that returns `null`/`undefined` unchanged, or the
 *   nested rule's result for anything else.
 * @throws Whatever `nested` throws when the input is non-nullish and fails
 *   the nested rule.
 *
 * @example
 * ```ts
 * import { isString, vg } from 'valgen';
 *
 * vg.nullable(isString)(''); // => ''
 * vg.nullable(isString)(undefined); // => undefined
 * vg.nullable(isString)(null); // => null
 * ```
 * @validator nullable
 */
export function nullable<T, I>(
  nested: Validator<T, I>,
  options?: nullable.Options,
) {
  return validator<Nullish<T>, Nullish<I>>(
    nullable.name,
    (input: Nullish<I>, context: Context): Maybe<T> => {
      if (input == null) return input as any;
      return nested(input as I, undefined, context) as T;
    },
    options,
  );
}

export namespace nullable {
  /** Options accepted by {@link nullable}. Only the shared {@link ValidationOptions} - no `nullable`-specific fields. */
  export interface Options extends ValidationOptions {}
}
