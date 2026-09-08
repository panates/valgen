import { isDateString as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isDateString - valid input (pass)',
    fn: () => {
      validate('2024-06-15T10:00:00');
    },
  },
  {
    name: 'isDateString - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-date');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isDateString - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-date');
    },
  },
];
