import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value a valid JWT token
 * @validator isJWT
 */
export function isJWT(options?: ValidationOptions) {
  return validator<string, string>(
    'isJWT',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isJWT(input)) return input;
      context.fail(_this, `Value must be valid JWT token`, input);
    },
    options,
  );
}
