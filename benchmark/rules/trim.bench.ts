import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.trim();

export const cases: BenchCase[] = [
  {
    name: 'trim - string input (pass)',
    fn: () => {
      validate('  hello  ');
    },
  },
  {
    name: 'trim - null input (pass through unchanged)',
    fn: () => {
      validate(null as any);
    },
  },
];
