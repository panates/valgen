import { isPlainObject } from '@jsopen/objects';
import type { Type } from 'ts-gems';
import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is an instance of a given class. With
 * `coerce: true`, a *plain* object (per `@jsopen/objects`' `isPlainObject`)
 * is mutated in place - via `Object.setPrototypeOf` - to become an instance
 * of `clazz`; an object that is already an instance of some other class is
 * not coerced.
 * @validator isInstanceOf
 * @param clazz - The class the value must be an instance of.
 * @param options - Validation options.
 * @returns The input value, unchanged (or coerced in place into an
 *   instance of `clazz`).
 * @throws `Value must be an instance of "<clazz.name>"` if the input is
 *   `null`, `undefined`, a primitive, or an instance of a different class.
 * @example
 * ```ts
 * import { isInstanceOf, vg } from 'valgen';
 *
 * class Class1 {}
 * const c1 = new Class1();
 *
 * isInstanceOf(Class1, c1); // => c1
 * isInstanceOf(Class1, {}, { coerce: true }); // => instance of Class1
 * ```
 */
export function isInstanceOf<T extends object>(
  clazz: Type<T>,
  options?: isInstanceOf.Options,
) {
  return validator<T, unknown>(
    isInstanceOf.name,
    (input: unknown, context: Context, _this): Nullish<any> => {
      if ((options?.coerce ?? context.coerce) && isPlainObject(input)) {
        Object.setPrototypeOf(input, clazz.prototype);
      }
      if (!(input instanceof clazz)) {
        context.fail(
          _this,
          `Value must be an instance of "${clazz.name}"`,
          input,
        );
      }
      return input;
    },
    options,
  );
}

export namespace isInstanceOf {
  export interface Options extends ValidationOptions {}
}
