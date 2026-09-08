import { isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

const validate = vg.required(isString);
const withDefault = vg.required(isString, { default: 'fallback' });

export const cases: BenchCase[] = [
  {
    name: 'required - defined valid input (pass, delegates to nested rule)',
    fn: () => {
      validate('hello');
    },
  },
  {
    name: 'required - undefined input (throws immediately)',
    fn: () => {
      try {
        validate(undefined);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'required - undefined input with a default (pass)',
    fn: () => {
      withDefault(undefined);
    },
  },
];
