import { allOf } from '../utility-rules/all-of.js';
import { getLength } from '../utility-rules/get-length.js';
import { pipe } from '../utility-rules/pipe.js';
import { isGte } from './is-gte.js';
import { isLte } from './is-lte.js';

/**
 * Checks that the length of the value is at least `minValue`.
 *
 * Not a hand-rolled rule - it is composed from other validators:
 * `allOf([pipe([getLength(), isGte(minValue, { onFail: ... })])])`.
 * `getLength()` extracts the length/size of a string, array, or any object
 * exposing a `length`/`size` property; `pipe` feeds that length into
 * `isGte`; `allOf` wraps the pipeline so the composed validator still
 * returns the *original* input (not the extracted length) on success.
 *
 * @param minValue - The minimum length the value must have.
 * @returns The original input value unchanged when its length is
 * `>= minValue`.
 * @throws `Value length must be at least <minValue>` if the value's length
 * is too short (or `Unable to get length` if `getLength()` cannot determine
 * a length for the input).
 * @example
 * ```ts
 * vg.lengthMin(3)('1234'); // => '1234'
 * vg.lengthMin(3)('ab');   // throws ValidationError: "Value length must be at least 3"
 * ```
 * @validator lengthMin
 */
export const lengthMin = (minValue: number) =>
  allOf([
    pipe([
      getLength(),
      isGte(minValue, {
        onFail: () => `Value length must be at least ${minValue}`,
      }),
    ]),
  ]);

/**
 * Checks that the length of the value is at most `maxValue`.
 *
 * Like `lengthMin`, this is composed from other validators:
 * `allOf([pipe([getLength(), isLte(maxValue, { onFail: ... })])])`.
 *
 * @param maxValue - The maximum length the value may have.
 * @returns The original input value unchanged when its length is
 * `<= maxValue`.
 * @throws `The length of {{label}} must be at most <maxValue>` if the
 * value's length is too long (`{{label}}` resolves to `Value` when no
 * `label`/`location`/`property` is set on the context), or
 * `Unable to get length` if `getLength()` cannot determine a length for the
 * input.
 * @example
 * ```ts
 * vg.lengthMax(3)('12');   // => '12'
 * vg.lengthMax(3)('1245'); // throws ValidationError: "The length of Value must be at most 3"
 * ```
 * @validator lengthMax
 */
export const lengthMax = (maxValue: number) =>
  allOf([
    pipe([
      getLength(),
      isLte(maxValue, {
        onFail: () => `The length of {{label}} must be at most ${maxValue}`,
      }),
    ]),
  ]);
