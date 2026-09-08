import { isHexColor as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

export const cases: BenchCase[] = [
  {
    name: 'isHexColor - valid input (pass)',
    fn: () => {
      validate('#fff');
    },
  },
  {
    name: 'isHexColor - invalid input (throws)',
    fn: () => {
      try {
        validate('notacolor');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isHexColor - invalid input (.silent())',
    fn: () => {
      validate.silent('notacolor');
    },
  },
];
