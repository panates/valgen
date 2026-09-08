import type { Maybe } from 'ts-gems';
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
  export interface Options extends ValidationOptions {}
}
