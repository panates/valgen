import { isNotEmpty as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isNotEmpty - valid input (pass)',
    fn: () => {
      validate('not-empty');
    },
  },
  {
    name: 'isNotEmpty - invalid input (throws)',
    fn: () => {
      try {
        validate('');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNotEmpty - invalid input (.silent())',
    fn: () => {
      validate.silent('');
    },
  },
];
