import type { Nullish } from 'ts-gems';
import type { Context } from './context.js';
import { isValidator, type Validator, validator } from './validator.js';

/**
 * Defers to a validator produced lazily by `fn`, so a schema can reference
 * itself (directly, or through a cycle of other schemas) without a
 * "used before defined" error.
 *
 * @typeParam T - The output type of the resolved validator.
 * @typeParam I - The input type of the resolved validator.
 * @param fn - Called on every validation to resolve the actual validator to
 *   delegate to - receives the current {@link Context} in case the
 *   resolution needs it.
 * @returns A validator that resolves and delegates to `fn(context)` on every call.
 *
 * @example
 * ```ts
 * import { forwardRef, vg } from 'valgen';
 *
 * // self-referential schema, e.g. a tree node
 * const treeNode = vg.isObject({
 *   value: vg.isNumber(),
 *   children: vg.optional(vg.isArray(forwardRef(() => treeNode))),
 * });
 * ```
 * @validator forwardRef
 */
export function forwardRef<T, I>(fn: (context: Context) => Validator<T, I>) {
  return validator<T, I>(
    'forwardRef',
    (input: I, context: Context): Nullish<T> => {
      const nested = fn(context);
      return nested(input, undefined, context);
    },
  );
}

/**
 * Picks between two validators (or plain values) based on whether `check`
 * passes against the input.
 *
 * @typeParam TOutput1 - The output type when `check` passes and `than_` is a validator.
 * @typeParam TOutput2 - The output type when `check` fails and `else_` is a validator.
 * @typeParam TDefault1 - The type of `than_` when it is a plain (non-validator) value.
 * @typeParam TDefault2 - The type of `else_` when it is a plain (non-validator) value.
 * @param check - Tried against the input; success (no throw) selects `than_`, failure selects `else_`.
 * @param than_ - Used when `check` passes: a validator to run against the
 *   input, or a constant value to return as-is (ignoring the input).
 * @param else_ - Used when `check` fails: a validator to run against the
 *   input, or a constant value to return as-is. Defaults to `undefined` when omitted.
 * @returns A validator that resolves to whichever branch `check` selects.
 *
 * @example
 * ```ts
 * import { iif, isDefined, isNumber, isString } from 'valgen';
 *
 * // coerce differently depending on whether the value is present
 * iif(isDefined, isString, isNumber)(1, { coerce: true }); // => '1'
 * ```
 * @validator iif
 */
export function iif<TOutput1, TOutput2, TDefault1, TDefault2>(
  check: Validator<any>,
  than_: TDefault1 | Validator<TOutput1, any>,
  else_?: TDefault2 | Validator<TOutput2, any>,
);
export function iif(check: Validator<any>, _then: any, _else?: any) {
  return validator<any, any>('iif', (input: unknown, context: Context): any => {
    let c = _else;
    try {
      check(input);
      c = _then;
    } catch {
      // ignored
    }
    if (isValidator(c)) return c(input, undefined, context);
    return c;
  });
}
