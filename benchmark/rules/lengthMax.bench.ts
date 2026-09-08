import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.lengthMax(5);

export const cases: BenchCase[] = [
  {
    name: 'lengthMax - valid input (pass)',
    fn: () => {
      validate('ab');
    },
  },
  {
    name: 'lengthMax - invalid input (throws)',
    fn: () => {
      try {
        validate('too-long');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'lengthMax - invalid input (.silent())',
    fn: () => {
      validate.silent('too-long');
    },
  },
];
