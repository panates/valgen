import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is "undefined"
 * @validator isUndefined
 */
export function isUndefined(options?: ValidationOptions) {
  return validator<any, unknown>(
    'isUndefined',
    (input: unknown, context: Context, _this): Nullish<any> => {
      if (options?.coerce || context.coerce) return undefined;
      if (input === undefined) return;
      context.fail(_this, `Value must be undefined`, input);
    },
    options,
  );
}
