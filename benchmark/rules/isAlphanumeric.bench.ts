import { isAlphanumeric as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isAlphanumeric - valid input (pass)',
    fn: () => {
      validate('abc123');
    },
  },
  {
    name: 'isAlphanumeric - invalid input (throws)',
    fn: () => {
      try {
        validate('abc-123');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isAlphanumeric - invalid input (.silent())',
    fn: () => {
      validate.silent('abc-123');
    },
  },
];
