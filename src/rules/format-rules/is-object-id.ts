import validatorJS from '@browsery/validator';
import {
  type Context,
  type Nullish,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates if value is an "ObjectId".
 * @validator isObjectId
 */
export function isObjectId(options?: ValidationOptions) {
  return validator<string | Uint8Array | isObjectId.ObjectIdLike, unknown>(
    'isObjectId',
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
  export declare interface ObjectIdLike {
    id: string | Uint8Array;

    toHexString(): string;
  }
}
