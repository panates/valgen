import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// lengthMin is a small composition (allOf + pipe + getLength + isGte), not a
// single hand-written rule - worth benchmarking to see what that composition
// overhead costs relative to a plain, single-function rule.
const validate = vg.lengthMin(3);

export const cases: BenchCase[] = [
  {
    name: 'lengthMin - valid input (pass)',
    fn: () => {
      validate('hello');
    },
  },
  {
    name: 'lengthMin - invalid input (throws)',
    fn: () => {
      try {
        validate('ab');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'lengthMin - invalid input (.silent())',
    fn: () => {
      validate.silent('ab');
    },
  },
];
