import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isLte(10);

export const cases: BenchCase[] = [
  {
    name: 'isLte - number, valid input (pass)',
    fn: () => {
      validate(10);
    },
  },
  {
    name: 'isLte - number, invalid input (throws)',
    fn: () => {
      try {
        validate(20);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isLte - number, invalid input (.silent())',
    fn: () => {
      validate.silent(20);
    },
  },
];
