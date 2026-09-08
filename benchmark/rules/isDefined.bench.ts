import { isDefined as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// isDefined is the simplest real rule in the library: a single strict
// comparison (`input !== undefined`) and, on failure, a single
// `context.fail(...)` call. It's a good baseline for the overhead of the
// validator wrapper itself (Context creation, try/catch, error building)
// since there's almost no rule-specific logic to account for.
// Note: the top-level `isDefined` export from 'valgen' is already a
// ready-made validator (`vg.isDefined()` called once at module load),
// not a factory - call it directly, don't invoke it again.

export const cases: BenchCase[] = [
  {
    name: 'isDefined - valid input (pass)',
    fn: () => {
      validate('some-value');
    },
  },
  {
    name: 'isDefined - invalid input (throws)',
    fn: () => {
      try {
        validate(undefined);
      } catch {
        // expected: isDefined(undefined) always fails
      }
    },
  },
  {
    name: 'isDefined - invalid input (.silent())',
    fn: () => {
      validate.silent(undefined);
    },
  },
];
