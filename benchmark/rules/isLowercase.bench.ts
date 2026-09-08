import { isLowercase as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isLowercase - valid input (pass)',
    fn: () => {
      validate('abc');
    },
  },
  {
    name: 'isLowercase - invalid input (throws)',
    fn: () => {
      try {
        validate('ABC');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isLowercase - invalid input (.silent())',
    fn: () => {
      validate.silent('ABC');
    },
  },
];
