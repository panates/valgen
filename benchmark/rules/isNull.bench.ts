import { isNull as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isNull - valid input (pass)',
    fn: () => {
      validate(null);
    },
  },
  {
    name: 'isNull - invalid input (throws)',
    fn: () => {
      try {
        validate('not-null');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNull - invalid input (.silent())',
    fn: () => {
      validate.silent('not-null');
    },
  },
];
