import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if the value is undefined.
 * If `coerce` is `true`, always succeeds and returns `undefined` regardless
 * of the input value - "coerce" here means "force to undefined", not
 * "convert values that merely look like undefined".
 * @validator isUndefined
 */
export function isUndefined(options?: isUndefined.Options) {
  return validator<any, unknown>(
    isUndefined.name,
    (input: unknown, context: Context, _this): Nullish<any> => {
      if (options?.coerce ?? context.coerce) return undefined;
      if (input === undefined) return;
      context.fail(_this, `Value must be undefined`, input);
    },
    options,
  );
}

export namespace isUndefined {
  export interface Options extends ValidationOptions {}
}
