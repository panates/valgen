import { isURL as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isURL - valid input (pass)',
    fn: () => {
      validate('https://example.com');
    },
  },
  {
    name: 'isURL - invalid input (throws)',
    fn: () => {
      try {
        validate('not a url');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isURL - invalid input (.silent())',
    fn: () => {
      validate.silent('not a url');
    },
  },
];
