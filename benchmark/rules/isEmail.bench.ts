import { isEmail as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isEmail - valid input (pass)',
    fn: () => {
      validate('me@domain.com');
    },
  },
  {
    name: 'isEmail - invalid input (throws)',
    fn: () => {
      try {
        validate('invalid');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isEmail - invalid input (.silent())',
    fn: () => {
      validate.silent('invalid');
    },
  },
];
