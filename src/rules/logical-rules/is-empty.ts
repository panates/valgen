import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Checks if the value is empty. Value should be string, array, set, map or object
 * @validator isEmpty
 */
export function isEmpty(options?: isEmpty.Options) {
  return validator<any, any>(
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

export namespace isEmpty {
  export interface Options extends ValidationOptions {}
}

/**
 * Checks if the value is not empty. Value should be string, array, set, map or object
 * @validator isNotEmpty
 */
export function isNotEmpty(options?: isNotEmpty.Options) {
  return validator<any, any>(
    'isNotEmpty',
    (input: unknown, context: Context, _this) => {
      if (input != null) {
        if (typeof input === 'string') {
          if (!input) context.fail(_this, `Value must not be empty`, input);
          return input;
        } else if (typeof input === 'number') {
          if (Number.isNaN(input))
            context.fail(_this, `Value must not be NaN`, input);
          return input;
        } else if (typeof input === 'object') {
          if (Array.isArray(input)) {
            if (!input.length)
              context.fail(_this, `Array must not be empty`, input);
            return input;
          } else if (input instanceof Set) {
            if (!input.size)
              context.fail(_this, `Set must not be empty`, input);
            return input;
          } else if (input instanceof Map) {
            if (!input.size)
              context.fail(_this, `Map must not be empty`, input);
            return input;
          } else if (Buffer.isBuffer(input)) {
            if (!input.length)
              context.fail(_this, `Buffer must not be empty`, input);
            return input;
          } else if (input instanceof ArrayBuffer) {
            if (!input.byteLength)
              context.fail(_this, `ArrayBuffer must not be empty`, input);
            return input;
          } else {
            if (input instanceof Date) return input;
            if (!Object.keys(input).length)
              context.fail(_this, `Object must not be empty`, input);
            return input;
          }
        }
        return input;
      }
      context.fail(_this, `Value must not be empty`, input);
      return input as any;
    },
    options,
  );
}

export namespace isNotEmpty {
  export interface Options extends ValidationOptions {}
}
