import validatorJS, {
  type UUIDVersion as _UUIDVersion,
} from '@browsery/validator';
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
export function isUUID(version?: isUUID.UUIDVersion, options?: isUUID.Options) {
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

export namespace isUUID {
  export type UUIDVersion = _UUIDVersion;
  export interface Options extends ValidationOptions {}
}
