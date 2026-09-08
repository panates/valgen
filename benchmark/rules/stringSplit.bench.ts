import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.stringSplit(',');

export const cases: BenchCase[] = [
  {
    name: 'stringSplit - string input (pass)',
    fn: () => {
      validate('a,b,c');
    },
  },
  {
    name: 'stringSplit - null input (pass through unchanged)',
    fn: () => {
      validate(null as any);
    },
  },
];
