import { isBase64 as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isBase64 - valid input (pass)',
    fn: () => {
      validate('SGVsbG8gV29ybGQ=');
    },
  },
  {
    name: 'isBase64 - invalid input (throws)',
    fn: () => {
      try {
        validate('not-base64!!');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isBase64 - invalid input (.silent())',
    fn: () => {
      validate.silent('not-base64!!');
    },
  },
];
