import { isMobilePhone as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isMobilePhone - valid input (pass)',
    fn: () => {
      validate('+14155552671');
    },
  },
  {
    name: 'isMobilePhone - invalid input (throws)',
    fn: () => {
      try {
        validate('12345');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isMobilePhone - invalid input (.silent())',
    fn: () => {
      validate.silent('12345');
    },
  },
];
