import { type Context, type Nullish, validator } from '../../core/index.js';

type ExtractLengthInput =
  string | any[] | ArrayBuffer | { length: number } | { size: number };

/**
 * Extracts a numeric length or size from a string, array, `ArrayBuffer`,
 * `Set`/`Map`, or any object exposing a `length`/`size` property. Takes no
 * options; it's typically piped into a comparison rule to enforce a min/max
 * length.
 *
 * @returns A validator that returns `input.length` for strings and arrays,
 *   `input.byteLength` for an `ArrayBuffer`, `input.length` for any object
 *   with a numeric `length` property (checked before `size`), or otherwise
 *   `input.size` for any object with a numeric `size` property (this covers
 *   `Set` and `Map`).
 * @throws {@link ValidationError} with `Unable to get length` for anything
 *   else (e.g. numbers, booleans, plain objects without `length`/`size`).
 *
 * @example
 * ```ts
 * import { vg } from 'valgen';
 *
 * vg.getLength()('1234'); // => 4
 * vg.getLength()([1, 2, 3, 4]); // => 4
 * vg.getLength()(new Set([1, 2, 3, 4])); // => 4
 *
 * // combine with a comparison rule to enforce a minimum length
 * const minLength3 = vg.pipe([vg.getLength(), vg.isGte(3)]);
 * minLength3('ab'); // throws (length 2 < 3)
 * ```
 * @validator getLength
 */
export function getLength() {
  return validator<number, ExtractLengthInput>(
    getLength.name,
    (input: any, context: Context, _this): Nullish<number> => {
      if (typeof input === 'string') return input.length;
      if (Array.isArray(input)) return input.length;
      if (input instanceof ArrayBuffer) return input.byteLength;
      if (
        input &&
        typeof input === 'object' &&
        typeof input.length === 'number'
      ) {
        return input.length;
      }
      if (
        input &&
        typeof input === 'object' &&
        typeof input.size === 'number'
      ) {
        return input.size;
      }
      context.fail(_this, `Unable to get length`, input);
    },
  );
}
