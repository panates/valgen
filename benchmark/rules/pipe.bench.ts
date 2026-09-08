import { isInteger, isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// pipe threads a value through N validators in sequence. Cost should scale
// roughly linearly with N (each step is one more nested validator call), so
// benchmarking 1/2/3-step chains side by side shows whether that holds.

const step1 = vg.pipe([vg.getLength()]);
const step2 = vg.pipe([vg.getLength(), vg.isGte(3)]);
const step3 = vg.pipe([isString, vg.getLength(), vg.isGte(3)]);
const withReturnIndex = vg.pipe([vg.getLength(), isInteger], {
  returnIndex: 0,
});

export const cases: BenchCase[] = [
  {
    name: 'pipe - 1 step - valid (pass)',
    fn: () => {
      step1('hello');
    },
  },
  {
    name: 'pipe - 2 steps - valid (pass)',
    fn: () => {
      step2('hello');
    },
  },
  {
    name: 'pipe - 3 steps - valid (pass)',
    fn: () => {
      step3('hello');
    },
  },
  {
    name: 'pipe - 2 steps - invalid, fails on step 2 (throws)',
    fn: () => {
      try {
        step2('ab');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'pipe - 2 steps - invalid, fails on step 2 (.silent())',
    fn: () => {
      step2.silent('ab');
    },
  },
  {
    name: 'pipe - returnIndex option - valid (pass)',
    fn: () => {
      withReturnIndex('hello');
    },
  },
];
