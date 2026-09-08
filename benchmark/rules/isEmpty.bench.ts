import { isEmpty as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isEmpty - valid input (pass)',
    fn: () => {
      validate('');
    },
  },
  {
    name: 'isEmpty - invalid input (throws)',
    fn: () => {
      try {
        validate('not-empty');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isEmpty - invalid input (.silent())',
    fn: () => {
      validate.silent('not-empty');
    },
  },
];
