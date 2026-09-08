import { isNotNull as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isNotNull - valid input (pass)',
    fn: () => {
      validate('not-null');
    },
  },
  {
    name: 'isNotNull - invalid input (throws)',
    fn: () => {
      try {
        validate(null);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNotNull - invalid input (.silent())',
    fn: () => {
      validate.silent(null);
    },
  },
];
