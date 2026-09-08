import { isBoolean as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isBoolean - valid input (pass)',
    fn: () => {
      validate(true);
    },
  },
  {
    name: 'isBoolean - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-boolean');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isBoolean - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-boolean');
    },
  },
];
