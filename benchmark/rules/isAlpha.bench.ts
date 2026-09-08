import { isAlpha as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isAlpha - valid input (pass)',
    fn: () => {
      validate('abcDEF');
    },
  },
  {
    name: 'isAlpha - invalid input (throws)',
    fn: () => {
      try {
        validate('abc123');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isAlpha - invalid input (.silent())',
    fn: () => {
      validate.silent('abc123');
    },
  },
];
