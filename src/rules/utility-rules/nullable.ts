import type { Maybe, Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Makes the sub-rule nullable (undefined of null)
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
  export interface Options extends ValidationOptions {}
}
