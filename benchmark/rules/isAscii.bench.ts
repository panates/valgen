import { isAscii as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isAscii - valid input (pass)',
    fn: () => {
      validate('abc123!@#');
    },
  },
  {
    name: 'isAscii - invalid input (throws)',
    fn: () => {
      try {
        validate('şiir');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isAscii - invalid input (.silent())',
    fn: () => {
      validate.silent('şiir');
    },
  },
];
