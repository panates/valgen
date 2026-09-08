import { isDate as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

const validDate = new Date('2024-06-15T10:00:00');

export const cases: BenchCase[] = [
  {
    name: 'isDate - valid input (pass)',
    fn: () => {
      validate(validDate);
    },
  },
  {
    name: 'isDate - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-date');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isDate - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-date');
    },
  },
];
