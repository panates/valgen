import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.stringReplace(/-/g, '_');

export const cases: BenchCase[] = [
  {
    name: 'stringReplace - string input (pass)',
    fn: () => {
      validate('a-b-c');
    },
  },
  {
    name: 'stringReplace - null input (pass through unchanged)',
    fn: () => {
      validate(null as any);
    },
  },
];
