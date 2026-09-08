import { isDecimal as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isDecimal - valid input (pass)',
    fn: () => {
      validate('1.5');
    },
  },
  {
    name: 'isDecimal - invalid input (throws)',
    fn: () => {
      try {
        validate('abc');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isDecimal - invalid input (.silent())',
    fn: () => {
      validate.silent('abc');
    },
  },
];
