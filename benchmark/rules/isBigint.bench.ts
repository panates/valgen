import { isBigint as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isBigint - valid input (pass)',
    fn: () => {
      validate(5n);
    },
  },
  {
    name: 'isBigint - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-bigint');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isBigint - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-bigint');
    },
  },
];
