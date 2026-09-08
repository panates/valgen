import { isMACAddress as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isMACAddress - valid input (pass)',
    fn: () => {
      validate('01:02:03:04:05:ab');
    },
  },
  {
    name: 'isMACAddress - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-mac');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isMACAddress - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-mac');
    },
  },
];
