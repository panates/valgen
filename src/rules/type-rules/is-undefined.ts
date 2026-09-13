import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is `undefined`. With `coerce: true`, the rule
 * never fails - every input, including `null` or `5`, resolves to
 * `undefined` ("coerce" here means "force to undefined", not "convert
 * values that merely look like undefined").
 * @validator isUndefined
 * @param options - Validation options.
 * @returns `undefined`.
 * @throws `Value must be undefined` if the input is anything other than
 *   `undefined` (and `coerce` is not set).
 * @example
 * ```ts
 * import { isUndefined } from 'valgen';
 *
 * isUndefined(undefined); // => undefined
 * isUndefined(5); // throws ValidationError: 'Value must be undefined'
 * isUndefined(0, { coerce: true }); // => undefined
 * ```
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
