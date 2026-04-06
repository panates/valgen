import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if the value is a string.
 * Converts input value to string if the oerce option is set to 'true'.
 * @validator isString
 */
export function isString(options?: isString.Options) {
  return validator<string, unknown>(
    'isString',
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
