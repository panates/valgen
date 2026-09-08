import { isISSN as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isISSN - valid input (pass)',
    fn: () => {
      validate('0378-5955');
    },
  },
  {
    name: 'isISSN - invalid input (throws)',
    fn: () => {
      try {
        validate('1234-1234');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isISSN - invalid input (.silent())',
    fn: () => {
      validate.silent('1234-1234');
    },
  },
];
