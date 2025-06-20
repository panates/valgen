import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Check if value is not nullish before calling nested rule
 * @validator required
 */
export function required<T, I>(
  nested: Validator<T, I>,
  options?: RequiredValidatorOptions,
) {
  return validator<Nullish<T>, I>(
    'required',
    (input: I, context: Context, _this): Nullish<T> => {
      if (input == null) input = options?.default;
      if (input == null) {
        context.fail(_this, `Value required`, input);
        return;
      }
      return nested(input, context) as T;
    },
    options,
  );
}

export interface RequiredValidatorOptions extends ValidationOptions {
  default?: any;
}
