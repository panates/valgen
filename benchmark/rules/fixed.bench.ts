import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// fixed never fails - it ignores the input entirely and always returns the
// same constant, so there's no invalid-input case to benchmark.
const validate = vg.fixed('constant-value');

export const cases: BenchCase[] = [
  {
    name: 'fixed - any input (always passes)',
    fn: () => {
      validate('whatever-is-passed-in-is-ignored');
    },
  },
];
