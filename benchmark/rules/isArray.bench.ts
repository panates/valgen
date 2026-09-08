import { isInteger, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isArray(isInteger);
const validArray = Array.from({ length: 20 }, (_, i) => i);
const invalidArray = Array.from({ length: 20 }, (_, i) =>
  i === 10 ? 'not-an-integer' : i,
);

export const cases: BenchCase[] = [
  {
    name: 'isArray(20 items) - all valid (pass)',
    fn: () => {
      validate(validArray);
    },
  },
  {
    name: 'isArray(20 items) - one invalid item (throws)',
    fn: () => {
      try {
        validate(invalidArray);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isArray(20 items) - one invalid item (.silent())',
    fn: () => {
      validate.silent(invalidArray);
    },
  },
];
