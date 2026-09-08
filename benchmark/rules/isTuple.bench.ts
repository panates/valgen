import { isNumber, isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isTuple([isString, isNumber]);

export const cases: BenchCase[] = [
  {
    name: 'isTuple - valid input (pass)',
    fn: () => {
      validate(['hello', 42]);
    },
  },
  {
    name: 'isTuple - invalid input (throws)',
    fn: () => {
      try {
        validate(['hello', 'not-a-number']);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isTuple - invalid input (.silent())',
    fn: () => {
      validate.silent(['hello', 'not-a-number']);
    },
  },
];
