import { isUppercase as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isUppercase - valid input (pass)',
    fn: () => {
      validate('ABC');
    },
  },
  {
    name: 'isUppercase - invalid input (throws)',
    fn: () => {
      try {
        validate('abc');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isUppercase - invalid input (.silent())',
    fn: () => {
      validate.silent('abc');
    },
  },
];
