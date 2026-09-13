import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is an array of a fixed length, applying a
 * distinct validator to each positional item. With `coerce: true`, a
 * non-array, non-null input is wrapped into a single-item array before
 * validating (only useful when `items.length === 1`).
 * @validator isTuple
 * @param items - The per-position validators; the input array must have
 *   exactly this many elements.
 * @param options - Validation options.
 * @returns A new array with each item replaced by its validated (and
 *   possibly coerced) value.
 * @throws `Value must be a tuple` if the input is `null`, `undefined`, or
 *   not an array (and not coercible into one).
 * @throws `Value must be a tuple of length <N>` if the array's length
 *   doesn't exactly match `items.length`.
 * @example
 * ```ts
 * import { isBoolean, isNumber, isString, vg } from 'valgen';
 *
 * vg.isTuple([isBoolean])([true]); // => [true]
 * vg.isTuple([isString, isNumber, isBoolean])([1, '2', 0], { coerce: true });
 * // => ['1', 2, false]
 * ```
 */
export function isTuple<T1, I1>(
  items: [Validator<T1, I1>],
  options?: isTuple.Options,
): Validator<[T1], [I1]>;
export function isTuple<T1, I1, T2, I2>(
  items: [Validator<T1, I1>, Validator<T2, I2>],
  options?: isTuple.Options,
): Validator<[T1, T2], [I1, I2]>;
export function isTuple<T1, I1, T2, I2, T3, I3>(
  items: [Validator<T1, I1>, Validator<T2, I2>, Validator<T3, I3>],
  options?: isTuple.Options,
): Validator<[T1, T2, T3], [I1, I2, I3]>;
export function isTuple<T1, I1, T2, I2, T3, I3, T4, I4>(
  items: [
    Validator<T1, I1>,
    Validator<T2, I2>,
    Validator<T3, I3>,
    Validator<T4, I4>,
  ],
  options?: isTuple.Options,
): Validator<[T1, T2, T3, T4], [I1, I2, I3, I4]>;
export function isTuple<T1, I1, T2, I2, T3, I3, T4, I4>(
  items: [
    Validator<T1, I1>,
    Validator<T2, I2>,
    Validator<T3, I3>,
    Validator<T4, I4>,
  ],
  options?: isTuple.Options,
): Validator<[T1, T2, T3, T4], [I1, I2, I3, I4]>;
export function isTuple<T1, I1, T2, I2, T3, I3, T4, I4, T5, I5>(
  items: [
    Validator<T1, I1>,
    Validator<T2, I2>,
    Validator<T3, I3>,
    Validator<T4, I4>,
    Validator<T5, I5>,
  ],
  options?: isTuple.Options,
): Validator<[T1, T2, T3, T4, T5], [I1, I2, I3, I4, I5]>;
export function isTuple<T1, I1, T2, I2, T3, I3, T4, I4, T5, I5, T6, I6>(
  items: [
    Validator<T1, I1>,
    Validator<T2, I2>,
    Validator<T3, I3>,
    Validator<T4, I4>,
    Validator<T5, I5>,
    Validator<T6, I6>,
    ...Validator[],
  ],
  options?: isTuple.Options,
): Validator<
  [T1, T2, T3, T4, T5, T6, ...any[]],
  [I1, I2, I3, I4, I5, I5, ...any[]]
>;
export function isTuple(items: Validator[], options?: ValidationOptions) {
  return validator<any>(
    isTuple.name,
    (input: unknown, context: Context, _this) => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && coerce && !Array.isArray(output)) output = [output];
      if (!Array.isArray(output)) {
        context.fail(_this, `Value must be a tuple`, input);
        return;
      }
      const nl = items.length;
      if (output.length !== nl) {
        context.fail(_this, `Value must be a tuple of length ${nl}`, input);
        return;
      }
      const location = context.location || '';
      let itemRule: Validator<any>;
      let i: number;
      let v: any;
      const out: any[] = [];
      const itemContext = context.extend();
      for (i = 0; i < nl; i++) {
        itemRule = items[i];
        itemContext.scope = output;
        itemContext.index = i;
        itemContext.location = location + '[' + i + ']';
        itemContext.label =
          (context.label || context.property || 'Value at ') + `[${i}]`;
        v = itemRule(output[i], undefined, itemContext);
        out.push(v);
      }
      return context.errors.length ? undefined : out;
    },
    options,
  );
}

export namespace isTuple {
  export interface Options extends ValidationOptions {}
}
