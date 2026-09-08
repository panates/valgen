import { isIBAN as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isIBAN - valid input (pass)',
    fn: () => {
      validate('DE89370400440532013000');
    },
  },
  {
    name: 'isIBAN - invalid input (throws)',
    fn: () => {
      try {
        validate('DE89370400440532013001');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isIBAN - invalid input (.silent())',
    fn: () => {
      validate.silent('DE89370400440532013001');
    },
  },
];
