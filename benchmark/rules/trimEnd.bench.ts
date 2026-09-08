import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.trimEnd();

export const cases: BenchCase[] = [
  {
    name: 'trimEnd - string input (pass)',
    fn: () => {
      validate('  hello  ');
    },
  },
];
