import type { Maybe } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Wraps a rule so that `undefined` passes through untouched, and anything
 * else (including `null`) is delegated to the nested rule.
 *
 * If `input === undefined`, it is returned as-is without calling the nested
 * rule. Unlike {@link nullable}, `null` is **not** special-cased - it is
 * passed straight through to the nested rule, so `optional(x)(null)` fails
 * unless `x` itself accepts `null`. For any other input, delegates to
 * `nested(input)` and returns/throws exactly what the nested rule does.
 *
 * @typeParam T - The nested validator's output type.
 * @typeParam I - The nested validator's input type.
 * @param nested - The validator to delegate to for non-`undefined` input.
 * @param options - Shared validation options (`coerce`, `onFail`); `optional`
 *   has no options of its own.
 * @returns A validator that returns `undefined` unchanged, or the nested
 *   rule's result for anything else.
 * @throws Whatever `nested` throws when the input is not `undefined` and
 *   fails the nested rule (including a `null` input, unless `nested` itself
 *   accepts `null`).
 *
 * @example
 * ```ts
 * import { isString, vg } from 'valgen';
 *
 * vg.optional(isString)(''); // => ''
 * vg.optional(isString)(undefined); // => undefined
 * vg.optional(isString)(null); // throws (null is not undefined, and isString rejects null)
 * ```
 * @validator optional
 */
export function optional<T, I>(
  nested: Validator<T, I>,
  options?: optional.Options,
) {
  return validator<Maybe<T>, Maybe<I>>(
    optional.name,
    (input: Maybe<I>, context: Context): Maybe<T> => {
      if (input === undefined) return input as any;
      return nested(input as I, undefined, context) as T;
    },
    options,
  );
}

export namespace optional {
  /** Options accepted by {@link optional}. Only the shared {@link ValidationOptions} - no `optional`-specific fields. */
  export interface Options extends ValidationOptions {}
}
