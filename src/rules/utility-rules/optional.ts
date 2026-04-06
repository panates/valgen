import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Makes the sub-rule optional
 * @validator optional
 */
export function optional<T, I>(
  nested: Validator<T, I>,
  options?: optional.Options,
) {
  return validator<Nullish<T>, Nullish<I>>(
    'optional',
    (input: Nullish<I>, context: Context): Nullish<T> => {
      if (input == null) return input as any;
      return nested(input as I, context) as T;
    },
    options,
  );
}

export namespace optional {
  export interface Options extends ValidationOptions {}
}
