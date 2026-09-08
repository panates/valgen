import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isGt(10);
// caseInsensitive only matters for strings, and only kicks in once the
// direct (case-sensitive) comparison has already failed - a distinct code
// path worth its own case. 'C' > 'b' is false case-sensitively (uppercase
// sorts before lowercase) but true once both sides are lower-cased, so this
// actually exercises the caseInsensitive branch rather than short-circuiting
// on the plain comparison.
const validateCI = vg.isGt('b', { caseInsensitive: true });

export const cases: BenchCase[] = [
  {
    name: 'isGt - number, valid input (pass)',
    fn: () => {
      validate(20);
    },
  },
  {
    name: 'isGt - number, invalid input (throws)',
    fn: () => {
      try {
        validate(5);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isGt - number, invalid input (.silent())',
    fn: () => {
      validate.silent(5);
    },
  },
  {
    name: 'isGt - string, caseInsensitive - valid (pass)',
    fn: () => {
      validateCI('C');
    },
  },
];
