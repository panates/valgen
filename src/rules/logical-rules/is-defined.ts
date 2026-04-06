import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is not "undefined" nor "null"
 * @validator isDefined
 */
export function isDefined(options?: isDefined.Options) {
  return validator<any, unknown>(
    'is-defined',
    (input: unknown, context: Context, _this) => {
      if (input !== undefined) return input;
      context.fail(_this, `Value must be defined`, input);
    },
    options,
  );
}

export namespace isDefined {
  export interface Options extends ValidationOptions {}
}
