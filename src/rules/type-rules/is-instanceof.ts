import { isPlainObject } from '@jsopen/objects';
import type { Type } from 'ts-gems';
import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if the value instance of given class or classes
 * @validator isUndefined
 */
export function isInstanceOf<T extends object>(
  clazz: Type<T>,
  options?: isInstanceOf.Options,
) {
  return validator<T, unknown>(
    'isInstanceOf',
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
