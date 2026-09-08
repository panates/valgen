import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isPassportNumber('US');

export const cases: BenchCase[] = [
  {
    name: 'isPassportNumber - valid input (pass)',
    fn: () => {
      validate('123456789');
    },
  },
  {
    name: 'isPassportNumber - invalid input (throws)',
    fn: () => {
      try {
        validate('12345');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isPassportNumber - invalid input (.silent())',
    fn: () => {
      validate.silent('12345');
    },
  },
];
