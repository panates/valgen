import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Checks that a property is present on its parent object, independent of
 * whether its value is `undefined`.
 *
 * Passes when `input !== undefined` (any defined value, including `null` or
 * `0`, is fine). When `input === undefined`, it still passes if the
 * surrounding object explicitly *has* the property (checked via
 * `Object.getOwnPropertyDescriptor` on `context.scope`/`context.property`) -
 * this only works when `exists()` is nested inside an object schema (e.g.
 * `vg.isObject({...})`) that populates `context.scope`/`context.property`;
 * used standalone, an `undefined` input always fails.
 *
 * @param options - Shared validation options (`coerce`, `onFail`); `exists`
 *   has no options of its own.
 * @returns A validator that returns the input unchanged when the property exists.
 * @throws {@link ValidationError} with `` `{{label}}` must exist `` (e.g.
 *   `` `a` must exist ``, or `Value must exist` at the root) when the
 *   property is truly absent.
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.exists()(0); // => 0
 * vg.exists()(null); // => null
 * vg.exists()(undefined); // throws: "Value must exist"
 *
 * const objVal = vg.isObject({ a: vg.exists() });
 * objVal({}); // throws: "`a` must exist"
 * ```
 * @validator exists
 */
export function exists(options?: exists.Options) {
  return validator<any, unknown>(
    exists.name,
    (input: unknown, context: Context, _this) => {
      if (
        input !== undefined ||
        (context.scope &&
          context.property != null &&
          Object.getOwnPropertyDescriptor(context.scope, context.property))
      ) {
        return input;
      }
      context.fail(_this, `{{label}} must exist`, input);
    },
    options,
  );
}

export namespace exists {
  /** Options accepted by {@link exists}. Only the shared {@link ValidationOptions} - no `exists`-specific fields. */
  export interface Options extends ValidationOptions {}
}
