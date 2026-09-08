import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// exists needs a context.scope + context.property to check against (it
// looks at the object the property came from, not just the value), so it's
// only meaningful wrapped inside isObject, not called bare.
const validate = vg.isObject({ a: vg.exists() });

export const cases: BenchCase[] = [
  {
    name: 'exists - key present with a value (pass)',
    fn: () => {
      validate({ a: 1 });
    },
  },
  {
    name: 'exists - key present but undefined (pass)',
    fn: () => {
      validate({ a: undefined });
    },
  },
  {
    name: 'exists - key missing entirely (throws)',
    fn: () => {
      try {
        validate({});
      } catch {
        // expected
      }
    },
  },
];
