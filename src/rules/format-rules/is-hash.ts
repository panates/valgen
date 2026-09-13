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
 * Validates that a string is a hash digest of the given algorithm. Delegates
 * to `validatorJS.isHash(input, algorithm)`, which checks that the string is
 * a hex string of the length expected for the given algorithm.
 * @validator isHash
 * @param algorithm - The hash algorithm the input is expected to match.
 * @param options - Validation options.
 * @returns The validated hash string, unchanged.
 * @throws `Value must be a valid ${algorithm} hash` when the input is not a
 *   string, or is not a hex string of the expected length for `algorithm`.
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * const isMd5 = vg.isHash('md5');
 * isMd5('5d41402abc4b2a76b9719d911017c592'); // => '5d41402abc4b2a76b9719d911017c592'
 * isMd5('too-short'); // throws ValidationError: "Value must be a valid md5 hash"
 * ```
 */
export function isHash(
  algorithm: isHash.HashAlgorithm,
  options?: ValidationOptions,
) {
  return validator<string, string>(
    isHash.name,
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
  /** The hash algorithms accepted by {@link isHash}'s `algorithm` argument. */
  export type HashAlgorithm = _HashAlgorithm;
}
