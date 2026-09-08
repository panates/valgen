import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isNotEqual('forbidden-value');

export const cases: BenchCase[] = [
  {
    name: 'isNotEqual - valid input (pass)',
    fn: () => {
      validate('other-value');
    },
  },
  {
    name: 'isNotEqual - invalid input (throws)',
    fn: () => {
      try {
        validate('forbidden-value');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isNotEqual - invalid input (.silent())',
    fn: () => {
      validate.silent('forbidden-value');
    },
  },
];
