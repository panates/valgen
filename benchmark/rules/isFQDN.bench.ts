import { isFQDN as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// The source (src/rules/format-rules/is-fqdn.ts) exports `isFQDN`, not
// `isFqdn` - both the bench filename and the import here match the real
// exported name. Values are reused from test/format-rules/is-fqdn.spec.ts.

export const cases: BenchCase[] = [
  {
    name: 'isFQDN - valid input (pass)',
    fn: () => {
      validate('example.com');
    },
  },
  {
    name: 'isFQDN - invalid input (throws)',
    fn: () => {
      try {
        validate('not a domain');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isFQDN - invalid input (.silent())',
    fn: () => {
      validate.silent('not a domain');
    },
  },
];
