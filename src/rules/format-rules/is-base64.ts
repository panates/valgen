import validatorJS, {
  type IsBase64Options as _IsBase64Options,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a "Base64" string.
 * @validator isBase64
 */
export function isBase64(options?: isBase64.Options) {
  return validator<string, string>(
    'isBase64',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isBase64(input, options)) {
        return input;
      }
      context.fail(_this, `"Value must be a Base64 string`, input);
    },
    options,
  );
}

export namespace isBase64 {
  export interface Options extends ValidationOptions, _IsBase64Options {}
}
