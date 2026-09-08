import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isLt(10);

export const cases: BenchCase[] = [
  {
    name: 'isLt - number, valid input (pass)',
    fn: () => {
      validate(5);
    },
  },
  {
    name: 'isLt - number, invalid input (throws)',
    fn: () => {
      try {
        validate(20);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isLt - number, invalid input (.silent())',
    fn: () => {
      validate.silent(20);
    },
  },
];
