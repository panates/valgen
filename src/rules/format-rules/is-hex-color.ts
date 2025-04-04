import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a Hex Color
 * @validator isHexColor
 */
export function isHexColor(options?: ValidationOptions) {
  return validator<string, string>(
    'isHexColor',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isHexColor(input)) {
        return input;
      }
      context.fail(_this, `Value must be a valid Hex Color`, input);
    },
    options,
  );
}
