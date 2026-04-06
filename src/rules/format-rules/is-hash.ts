import validatorJS, {
  type HashAlgorithm as _HashAlgorithm,
} from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value a hash of type algorithm
 * @validator isHash
 */
export function isHash(
  algorithm: isHash.HashAlgorithm,
  options?: ValidationOptions,
) {
  return validator<string, string>(
    'isHash',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isHash(input, algorithm)) {
        return input;
      }
      context.fail(_this, `Value must be a valid ${algorithm} hash`, input);
    },
    options,
  );
}

export namespace isHash {
  export type HashAlgorithm = _HashAlgorithm;
}
