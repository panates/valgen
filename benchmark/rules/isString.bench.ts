import { isString as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isString - valid input (pass)',
    fn: () => {
      validate('hello');
    },
  },
  {
    name: 'isString - invalid input (throws)',
    fn: () => {
      try {
        validate(42);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isString - invalid input (.silent())',
    fn: () => {
      validate.silent(42);
    },
  },
];
