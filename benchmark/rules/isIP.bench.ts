import { isIP as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isIP - valid input (pass)',
    fn: () => {
      validate('192.168.1.1');
    },
  },
  {
    name: 'isIP - invalid input (throws)',
    fn: () => {
      try {
        validate('not-an-ip');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isIP - invalid input (.silent())',
    fn: () => {
      validate.silent('not-an-ip');
    },
  },
];
