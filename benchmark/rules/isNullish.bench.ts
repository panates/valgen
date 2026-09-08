import { isNullish as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isNullish - valid input (pass)',
    fn: () => {
      validate(null);
    },
  },
  {
    name: 'isNullish - invalid input (throws)',
    fn: () => {
      try {
        validate('not-nullish');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNullish - invalid input (.silent())',
    fn: () => {
      validate.silent('not-nullish');
    },
  },
];
