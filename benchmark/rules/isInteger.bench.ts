import { isInteger as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isInteger - valid input (pass)',
    fn: () => {
      validate(42);
    },
  },
  {
    name: 'isInteger - invalid input (throws)',
    fn: () => {
      try {
        validate(3.14);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isInteger - invalid input (.silent())',
    fn: () => {
      validate.silent(3.14);
    },
  },
];
