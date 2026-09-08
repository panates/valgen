import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.matches(/^\d+$/);

export const cases: BenchCase[] = [
  {
    name: 'matches - valid input (pass)',
    fn: () => {
      validate('12345');
    },
  },
  {
    name: 'matches - invalid input (throws)',
    fn: () => {
      try {
        validate('abc123');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'matches - invalid input (.silent())',
    fn: () => {
      validate.silent('abc123');
    },
  },
];
