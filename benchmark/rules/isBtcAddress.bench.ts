import { isBtcAddress as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isBtcAddress - valid input (pass)',
    fn: () => {
      validate('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2');
    },
  },
  {
    name: 'isBtcAddress - invalid input (throws)',
    fn: () => {
      try {
        validate('notabtcaddress');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isBtcAddress - invalid input (.silent())',
    fn: () => {
      validate.silent('notabtcaddress');
    },
  },
];
