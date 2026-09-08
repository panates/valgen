import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isGte(10);

export const cases: BenchCase[] = [
  {
    name: 'isGte - number, valid input (pass)',
    fn: () => {
      validate(10);
    },
  },
  {
    name: 'isGte - number, invalid input (throws)',
    fn: () => {
      try {
        validate(5);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isGte - number, invalid input (.silent())',
    fn: () => {
      validate.silent(5);
    },
  },
];
