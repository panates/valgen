import { isHex as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isHex - valid input (pass)',
    fn: () => {
      validate('1a2B3c');
    },
  },
  {
    name: 'isHex - invalid input (throws)',
    fn: () => {
      try {
        validate('zzz');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isHex - invalid input (.silent())',
    fn: () => {
      validate.silent('zzz');
    },
  },
];
