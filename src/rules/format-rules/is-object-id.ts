import validatorJS from '@browsery/validator';
import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a value is a valid MongoDB `ObjectId` (a 24-char hex
 * string, a 12-byte `Uint8Array`, or an object exposing `toHexString()`).
 * Unlike most format rules, this is not a wrapper around
 * `@browsery/validator`'s own `isObjectId` - it implements its own check,
 * using `validatorJS.isHexadecimal` only for the string case.
 * @validator isObjectId
 * @param options - Validation options.
 * @returns The validated value, unchanged (its original type - string,
 *   `Uint8Array`, or `ObjectIdLike`).
 * @throws `Value must be a valid ObjectId` when the input is not a
 *   24-character hex string, a 12-byte `Uint8Array`, or an object whose
 *   `toHexString()` result passes the same check.
 * @example
 * ```ts
 * import { isObjectId } from 'valgen';
 *
 * const idString = '64897efbdf01a60ac1b678ea';
 * isObjectId(idString); // => '64897efbdf01a60ac1b678ea'
 * isObjectId(undefined); // throws ValidationError: "Value must be a valid ObjectId"
 * ```
 */
export function isObjectId(options?: ValidationOptions) {
  return validator<string | Uint8Array | isObjectId.ObjectIdLike, unknown>(
    isObjectId.name,
    (
      input: any,
      context: Context,
      _this,
    ): Nullish<string | Uint8Array | isObjectId.ObjectIdLike> => {
      if (
        input != null &&
        (_isObjectIdValue(input) ||
          (typeof input === 'object' &&
            typeof input.toHexString === 'function' &&
            _isObjectIdValue(input.toHexString())))
      ) {
        return input;
      }
      context.fail(_this, `Value must be a valid ObjectId`, input);
    },
    options,
  );
}

function _isObjectIdValue(input: string | Uint8Array): boolean {
  return (
    (input instanceof Uint8Array && input.length === 12) ||
    (typeof input === 'string' &&
      input.length === 24 &&
      validatorJS.isHexadecimal(input))
  );
}

export namespace isObjectId {
  /** An object exposing a MongoDB-style `toHexString()` method, accepted as input alongside plain hex strings and 12-byte `Uint8Array`s. */
  export declare interface ObjectIdLike {
    id: string | Uint8Array;

    toHexString(): string;
  }
}
