import { isTime as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isTime - valid input (pass)',
    fn: () => {
      validate('12:30:48.123');
    },
  },
  {
    name: 'isTime - invalid input (throws)',
    fn: () => {
      try {
        validate('25:00');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isTime - invalid input (.silent())',
    fn: () => {
      validate.silent('25:00');
    },
  },
];
