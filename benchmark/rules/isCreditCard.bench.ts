import { isCreditCard as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// Uses a Luhn-valid Visa test number for the passing case and the same
// number with its last digit flipped (fails the Luhn checksum) for the
// failing cases - both values are reused from
// test/format-rules/is-credit-card.spec.ts.

export const cases: BenchCase[] = [
  {
    name: 'isCreditCard - valid input (pass)',
    fn: () => {
      validate('4111111111111111');
    },
  },
  {
    name: 'isCreditCard - invalid input (throws)',
    fn: () => {
      try {
        validate('4111111111111112');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isCreditCard - invalid input (.silent())',
    fn: () => {
      validate.silent('4111111111111112');
    },
  },
];
