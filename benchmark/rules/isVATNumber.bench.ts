import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isVATNumber('AT');

export const cases: BenchCase[] = [
  {
    name: 'isVATNumber - valid input (pass)',
    fn: () => {
      validate('ATU12345678');
    },
  },
  {
    name: 'isVATNumber - invalid input (throws)',
    fn: () => {
      try {
        validate('12345');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isVATNumber - invalid input (.silent())',
    fn: () => {
      validate.silent('12345');
    },
  },
];
