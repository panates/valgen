import { isUUID as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isUUID - valid input (pass)',
    fn: () => {
      validate('01e0fee8-60d5-42a5-997c-b55a4f3e973f');
    },
  },
  {
    name: 'isUUID - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-uuid');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isUUID - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-uuid');
    },
  },
];
