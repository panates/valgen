import { isNumber, isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isRecord(isString, isNumber);
const validRecord = { a: 1, b: 2, c: 3 };
const invalidRecord = { a: 1, b: 'not-a-number', c: 3 } as any;

export const cases: BenchCase[] = [
  {
    name: 'isRecord - valid input (pass)',
    fn: () => {
      validate(validRecord);
    },
  },
  {
    name: 'isRecord - invalid input (throws)',
    fn: () => {
      try {
        validate(invalidRecord);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isRecord - invalid input (.silent())',
    fn: () => {
      validate.silent(invalidRecord);
    },
  },
];
