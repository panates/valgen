import validatorJS, { UUIDVersion } from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is a "UUID".
 * @validator isUUID
 */
export function isUUID(version?: UUIDVersion, options?: ValidationOptions) {
  return validator<string, string>(
    'isUUID',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isUUID(input, version)
      ) {
        return input;
      }
      context.fail(
        _this,
        `Value must be a valid UUID${version ? ' v' + version : ''}`,
        input,
      );
    },
    options,
  );
}
