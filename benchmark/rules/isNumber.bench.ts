import { isNumber as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isNumber - valid input (pass)',
    fn: () => {
      validate(3.14);
    },
  },
  {
    name: 'isNumber - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-number');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNumber - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-number');
    },
  },
];
