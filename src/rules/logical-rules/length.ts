import { allOf } from '../utility-rules/all-of.js';
import { getLength } from '../utility-rules/get-length.js';
import { pipe } from '../utility-rules/pipe.js';
import { isGte } from './is-gte.js';
import { isLte } from './is-lte.js';

/**
 * Checks the length is at least "minValue"
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
 * Checks if the length is at most "maxValue"
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
