import { isNotNullish as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isNotNullish - valid input (pass)',
    fn: () => {
      validate('not-nullish');
    },
  },
  {
    name: 'isNotNullish - invalid input (throws)',
    fn: () => {
      try {
        validate(null);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNotNullish - invalid input (.silent())',
    fn: () => {
      validate.silent(null);
    },
  },
];
