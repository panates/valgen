import { validator } from '../../core/index.js';

/**
 * Ignores whatever input it is given and always returns the same constant
 * value. Never inspects or validates the input and never calls
 * `context.fail` - it always succeeds. Useful for injecting a constant field
 * into an object schema, or as the "otherwise" branch of another combinator
 * (e.g. `iif`).
 *
 * @typeParam T - The type of the constant `value` returned on every call.
 * @typeParam I - The (ignored) input type.
 * @param value - The constant value to return, regardless of what is passed
 *   in at call time.
 * @returns A validator that always returns `value`.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.fixed(0)(1); // => 0
 * vg.fixed(null)(1); // => null
 * ```
 * @validator fixed
 */
export function fixed<T, I>(value: T) {
  return validator<T, I>(fixed.name, (): T => {
    return value;
  });
}
