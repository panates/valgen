import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

type IsEmptyInput = string | any[] | object | Set<any> | Map<any, any>;

/**
 * Checks if value is an empty. Value should be string, array, set, map or object
 * @validator isEmpty
 */
export function isEmpty(options?: ValidationOptions) {
  return validator<IsEmptyInput, IsEmptyInput>(
    'isEmpty',
    (input: unknown, context: Context, _this) => {
      if (input == null) return input;
      if (typeof input === 'string') {
        if (input) context.fail(_this, `Value must be an empty string`, input);
        return input;
      } else if (Array.isArray(input)) {
        if (input.length)
          context.fail(_this, `Value must be an empty array`, input);
        return input;
      } else if (input instanceof Set) {
        if (input.size)
          context.fail(_this, `Value must be an empty Set`, input);
        return input;
      } else if (input instanceof Map) {
        if (input.size)
          context.fail(_this, `Value must be an empty Map`, input);
        return input;
      } else if (Buffer.isBuffer(input)) {
        if (input.length)
          context.fail(_this, `Value must be an empty Buffer`, input);
        return input;
      } else if (input instanceof ArrayBuffer) {
        if (input.byteLength)
          context.fail(_this, `Value must be an empty ArrayBuffer`, input);
        return input;
      } else if (typeof input === 'object') {
        if (input instanceof Date) return input;
        if (Object.keys(input).length)
          context.fail(_this, `Value must be an empty Object`, input);
        return input;
      }
      context.fail(_this, `Value must be empty`, input);
    },
    options,
  );
}

/**
 * Checks if value is a not empty. Value should be string, array, set, map or object
 * @validator isNotEmpty
 */
export function isNotEmpty(options?: ValidationOptions) {
  return validator<IsEmptyInput, IsEmptyInput>(
    'isNotEmpty',
    (input: unknown, context: Context, _this) => {
      if (input != null) {
        if (typeof input === 'string') {
          if (!input) context.fail(_this, `Value must not be empty`, input);
          return input;
        } else if (Array.isArray(input)) {
          if (!input.length)
            context.fail(_this, `Array must not be empty`, input);
          return input;
        } else if (input instanceof Set) {
          if (!input.size) context.fail(_this, `Set must not be empty`, input);
          return input;
        } else if (input instanceof Map) {
          if (!input.size) context.fail(_this, `Map must not be empty`, input);
          return input;
        } else if (Buffer.isBuffer(input)) {
          if (!input.length)
            context.fail(_this, `Buffer must not be empty`, input);
          return input;
        } else if (input instanceof ArrayBuffer) {
          if (!input.byteLength)
            context.fail(_this, `ArrayBuffer must not be empty`, input);
          return input;
        } else if (typeof input === 'object') {
          if (input instanceof Date) return input;
          if (!Object.keys(input).length)
            context.fail(_this, `Object must not be empty`, input);
          return input;
        }
      }
      context.fail(_this, `Value must not be empty`, input);
      return input as any;
    },
    options,
  );
}
