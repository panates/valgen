import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.trimStart();

export const cases: BenchCase[] = [
  {
    name: 'trimStart - string input (pass)',
    fn: () => {
      validate('  hello  ');
    },
  },
];
