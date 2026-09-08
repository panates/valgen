import { isAny as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// isAny never fails (it's a pure passthrough), so there's no invalid-input
// case to benchmark - this is the theoretical floor for validator overhead.

export const cases: BenchCase[] = [
  {
    name: 'isAny - any input (always passes)',
    fn: () => {
      validate('some-value');
    },
  },
];
