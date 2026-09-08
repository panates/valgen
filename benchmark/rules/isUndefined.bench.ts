import { isUndefined as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// isUndefined mirrors isDefined's shape (single strict comparison, single
// context.fail on failure) - the two benchmarks are a natural pair to
// compare against each other.
// Note: the top-level `isUndefined` export from 'valgen' is already a
// ready-made validator (`vg.isUndefined()` called once at module load),
// not a factory - call it directly, don't invoke it again.

export const cases: BenchCase[] = [
  {
    name: 'isUndefined - valid input (pass)',
    fn: () => {
      validate(undefined);
    },
  },
  {
    name: 'isUndefined - invalid input (throws)',
    fn: () => {
      try {
        validate('some-value');
      } catch {
        // expected: isUndefined('some-value') always fails
      }
    },
  },
  {
    name: 'isUndefined - invalid input (.silent())',
    fn: () => {
      validate.silent('some-value');
    },
  },
];
