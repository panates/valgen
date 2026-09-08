import { isInteger, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// allOf runs every rule against the SAME original input (unlike pipe, which
// threads output into input) and always returns the original input. Cost
// should scale with rule count, so 1/2/3-rule cases show whether that holds.

const rule1 = vg.allOf([isInteger]);
const rule2 = vg.allOf([isInteger, vg.isGt(0)]);
const rule3 = vg.allOf([isInteger, vg.isGt(0), vg.isLt(100)]);

export const cases: BenchCase[] = [
  {
    name: 'allOf - 1 rule - valid (pass)',
    fn: () => {
      rule1(42);
    },
  },
  {
    name: 'allOf - 2 rules - valid (pass)',
    fn: () => {
      rule2(42);
    },
  },
  {
    name: 'allOf - 3 rules - valid (pass)',
    fn: () => {
      rule3(42);
    },
  },
  {
    name: 'allOf - 3 rules - invalid, fails 1st rule (throws)',
    fn: () => {
      try {
        rule3('not-an-integer');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'allOf - 3 rules - invalid, fails last rule (throws)',
    fn: () => {
      try {
        rule3(1000);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'allOf - 3 rules - invalid, fails last rule (.silent())',
    fn: () => {
      rule3.silent(1000);
    },
  },
];
