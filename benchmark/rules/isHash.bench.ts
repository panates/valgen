import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.isHash('md5');

export const cases: BenchCase[] = [
  {
    name: 'isHash - valid input (pass)',
    fn: () => {
      validate('5d41402abc4b2a76b9719d911017c592');
    },
  },
  {
    name: 'isHash - invalid input (throws)',
    fn: () => {
      try {
        validate('too-short');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isHash - invalid input (.silent())',
    fn: () => {
      validate.silent('too-short');
    },
  },
];
