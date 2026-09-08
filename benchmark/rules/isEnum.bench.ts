import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isEnum(['red', 'green', 'blue']);

export const cases: BenchCase[] = [
  {
    name: 'isEnum - valid input (pass)',
    fn: () => {
      validate('green');
    },
  },
  {
    name: 'isEnum - invalid input (throws)',
    fn: () => {
      try {
        validate('purple');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isEnum - invalid input (.silent())',
    fn: () => {
      validate.silent('purple');
    },
  },
];
