import { isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.optional(isString);

export const cases: BenchCase[] = [
  {
    name: 'optional - undefined input (pass, short-circuits before nested rule)',
    fn: () => {
      validate(undefined);
    },
  },
  {
    name: 'optional - defined valid input (pass, delegates to nested rule)',
    fn: () => {
      validate('hello');
    },
  },
  {
    name: 'optional - defined invalid input (throws from nested rule)',
    fn: () => {
      try {
        validate(42);
      } catch {
        // expected
      }
    },
  },
];
