import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isEqual('expected-value');

export const cases: BenchCase[] = [
  {
    name: 'isEqual - valid input (pass)',
    fn: () => {
      validate('expected-value');
    },
  },
  {
    name: 'isEqual - invalid input (throws)',
    fn: () => {
      try {
        validate('other-value');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isEqual - invalid input (.silent())',
    fn: () => {
      validate.silent('other-value');
    },
  },
];
