import { isEAN as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// The source (src/rules/format-rules/is-ean.ts) exports `isEAN`, not
// `isEan` - both the bench filename and the import here match the real
// exported name. Values are reused from test/format-rules/is-ean.spec.ts.

export const cases: BenchCase[] = [
  {
    name: 'isEAN - valid input (pass)',
    fn: () => {
      validate('4006381333931');
    },
  },
  {
    name: 'isEAN - invalid input (throws)',
    fn: () => {
      try {
        validate('1234567890123');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isEAN - invalid input (.silent())',
    fn: () => {
      validate.silent('1234567890123');
    },
  },
];
