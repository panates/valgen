import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.getLength();
const arr = [1, 2, 3, 4, 5];
const set = new Set([1, 2, 3]);

export const cases: BenchCase[] = [
  {
    name: 'getLength - string (pass)',
    fn: () => {
      validate('hello');
    },
  },
  {
    name: 'getLength - array (pass)',
    fn: () => {
      validate(arr);
    },
  },
  {
    name: 'getLength - Set (pass)',
    fn: () => {
      validate(set);
    },
  },
  {
    name: 'getLength - unsupported type (throws)',
    fn: () => {
      try {
        validate(42 as any);
      } catch {
        // expected
      }
    },
  },
];
