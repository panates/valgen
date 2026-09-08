import { isJWT as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

const validJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';

export const cases: BenchCase[] = [
  {
    name: 'isJWT - valid input (pass)',
    fn: () => {
      validate(validJwt);
    },
  },
  {
    name: 'isJWT - invalid input (throws)',
    fn: () => {
      try {
        validate('abc.def');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isJWT - invalid input (.silent())',
    fn: () => {
      validate.silent('abc.def');
    },
  },
];
