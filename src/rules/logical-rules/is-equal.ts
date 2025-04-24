import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 *
 * @validator isEqual
 */
export function isEqual<T>(compare: T, options?: ValidationOptions) {
  return validator<any, any>(
    'isEqual',
    (input: unknown, context: Context, _this) => {
      if (input == null) return input;
      if (input !== compare)
        context.fail(_this, `Value must be equal to "${compare}"`, input);
      return input;
    },
    options,
  );
}

/**
 *
 * @validator isNotEqual
 */
export function isNotEqual(compare: any, options?: ValidationOptions) {
  return validator<any, any>(
    'isNotEqual',
    (input: unknown, context: Context, _this) => {
      if (input == null) return input;
      if (input === compare) {
        context.fail(_this, `Value must not be equal to "${compare}"`, input);
      }
      return input;
    },
    options,
  );
}
