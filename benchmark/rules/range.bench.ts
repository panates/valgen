import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.range<number>(5, 10);

export const cases: BenchCase[] = [
  {
    name: 'range - number, valid input (pass)',
    fn: () => {
      validate(7);
    },
  },
  {
    name: 'range - number, invalid input (throws)',
    fn: () => {
      try {
        validate(20);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'range - number, invalid input (.silent())',
    fn: () => {
      validate.silent(20);
    },
  },
];
