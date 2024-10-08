import { type Nullish } from 'ts-gems';
import * as validatorJS from 'validator';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a port number
 * @validator isPort
 */
export function isPort(options?: ValidationOptions) {
  return validator<string, string>(
    'isPort',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isPort(input)
      ) {
        return input;
      }
      context.fail(_this, `{{label}} is not a valid port number`, input);
    },
    options,
  );
}
