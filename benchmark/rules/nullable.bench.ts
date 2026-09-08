import { isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.nullable(isString);

export const cases: BenchCase[] = [
  {
    name: 'nullable - null input (pass, short-circuits before nested rule)',
    fn: () => {
      validate(null);
    },
  },
  {
    name: 'nullable - defined valid input (pass, delegates to nested rule)',
    fn: () => {
      validate('hello');
    },
  },
  {
    name: 'nullable - defined invalid input (throws from nested rule)',
    fn: () => {
      try {
        validate(42);
      } catch {
        // expected
      }
    },
  },
];
