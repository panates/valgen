import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is a `string`. With `coerce: true`, converts any
 * non-`string`, non-nullish value into a `string` - an object with a
 * `toJSON` method is stringified via `toJSON()`, other objects via
 * `JSON.stringify`, and everything else via `String()`.
 * @validator isString
 * @param options - Validation options.
 * @returns The validated (and possibly coerced) `string`.
 * @throws `Value must be a string` if the input is `null`, `undefined`, or
 *   (without coercion) not a `string`.
 * @example
 * ```ts
 * import { isString } from 'valgen';
 *
 * isString('1'); // => '1'
 * isString(1, { coerce: true }); // => '1'
 * isString({ toJSON: () => 'test' }, { coerce: true }); // => 'test'
 * ```
 */
export function isString(options?: isString.Options) {
  return validator<string, unknown>(
    isString.name,
    (input: any, context: Context, _this): Nullish<string> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && typeof output !== 'string' && coerce) {
        if (typeof output === 'object') {
          if (typeof output.toJSON === 'function') output = output.toJSON();
          else output = JSON.stringify(output);
        } else output = String(output);
      }
      if (typeof output === 'string') return output;
      context.fail(_this, `Value must be a string`, input);
    },
    options,
  );
}

export namespace isString {
  export interface Options extends ValidationOptions {}
}
