import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Checks that the value is empty. The value should be a string, array, Set,
 * Map, Buffer, ArrayBuffer, or plain object.
 *
 * `null`/`undefined` pass through unchanged (treated as empty), and `Date`
 * instances always pass since a date has no "empty" concept.
 *
 * @param options - Validation options (`onFail`, `coerce`, ...).
 * @returns The input value unchanged when it is considered empty.
 * @throws `Value must be an empty string` / `Value must be an empty array` /
 * `Value must be an empty Set` / `Value must be an empty Map` / `Value must
 * be an empty Buffer` / `Value must be an empty ArrayBuffer` / `Value must be
 * an empty Object`, depending on the input's type, or the generic `Value
 * must be empty` for any other non-empty type (e.g. `NaN`).
 * @example
 * ```ts
 * isEmpty('');   // => ''
 * isEmpty([]);   // => []
 * isEmpty('dd'); // throws ValidationError: "Value must be an empty string"
 * ```
 * @validator isEmpty
 */
export function isEmpty(options?: isEmpty.Options) {
  return validator<any, any>(
    isEmpty.name,
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
  /** Options for {@link isEmpty} - adds no properties beyond `ValidationOptions`. */
  export interface Options extends ValidationOptions {}
}

/**
 * Checks that the value is not empty. The value should be a string, array,
 * Set, Map, Buffer, ArrayBuffer, or plain object.
 *
 * Unlike `isEmpty`, nullish input is rejected here rather than treated as
 * passing, and `Date` instances always pass.
 *
 * @param options - Validation options (`onFail`, `coerce`, ...).
 * @returns The input value unchanged when it is considered non-empty.
 * @throws `Value must not be empty` for `null`/`undefined`/an empty string,
 * `Value must not be NaN` for `NaN`, `Array must not be empty`, `Set must
 * not be empty`, `Map must not be empty`, `Buffer must not be empty`,
 * `ArrayBuffer must not be empty`, or `Object must not be empty`, depending
 * on the input's type.
 * @example
 * ```ts
 * isNotEmpty('abc'); // => 'abc'
 * isNotEmpty('');    // throws ValidationError: "Value must not be empty"
 * isNotEmpty([]);    // throws ValidationError: "Array must not be empty"
 * ```
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
  /** Options for {@link isNotEmpty} - adds no properties beyond `ValidationOptions`. */
  export interface Options extends ValidationOptions {}
}
