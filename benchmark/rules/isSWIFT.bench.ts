import { isSWIFT as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isSWIFT - valid input (pass)',
    fn: () => {
      validate('DEUTDEFF500');
    },
  },
  {
    name: 'isSWIFT - invalid input (throws)',
    fn: () => {
      try {
        validate('1234DEFF');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isSWIFT - invalid input (.silent())',
    fn: () => {
      validate.silent('1234DEFF');
    },
  },
];
