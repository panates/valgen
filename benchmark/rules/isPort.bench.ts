import { isPort as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isPort - valid input (pass)',
    fn: () => {
      validate('8080');
    },
  },
  {
    name: 'isPort - invalid input (throws)',
    fn: () => {
      try {
        validate('99999');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isPort - invalid input (.silent())',
    fn: () => {
      validate.silent('99999');
    },
  },
];
