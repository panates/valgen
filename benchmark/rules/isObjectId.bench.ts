import { isObjectId as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isObjectId - valid input (pass)',
    fn: () => {
      validate('64897efbdf01a60ac1b678ea');
    },
  },
  {
    name: 'isObjectId - invalid input (throws)',
    fn: () => {
      try {
        validate('zzzzzzzzzzzzzzzzzzzzzzzz');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isObjectId - invalid input (.silent())',
    fn: () => {
      validate.silent('zzzzzzzzzzzzzzzzzzzzzzzz');
    },
  },
];
