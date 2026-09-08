import { isIPRange as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isIPRange - valid input (pass)',
    fn: () => {
      validate('192.168.1.0/24');
    },
  },
  {
    name: 'isIPRange - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-range');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isIPRange - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-range');
    },
  },
];
