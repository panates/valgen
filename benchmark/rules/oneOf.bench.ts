import { isNumber, isString, vg } from 'valgen';
import type { BenchCase } from '../harness.js';

// oneOf tries each rule in order until one passes (or none do). Its cost
// should depend on WHICH branch matches - matching the first rule tried is
// cheap, matching the last (or matching nothing at all) means every earlier
// rule was attempted and failed first. It also has a completely separate,
// more involved path for discriminator-based branches (an object schema
// selected by a field value), which is worth benchmarking on its own.

const union = vg.oneOf([isString, isNumber]);

const dogSchema = { kind: vg.isEqual('dog'), name: isString };
const catSchema = { kind: vg.isEqual('cat'), name: isString };
const discriminated = vg.oneOf([
  [vg.isObject(dogSchema), { kind: vg.isEqual('dog') }],
  [vg.isObject(catSchema), { kind: vg.isEqual('cat') }],
]);
const dogInput = { kind: 'dog', name: 'Rex' };
const catInput = { kind: 'cat', name: 'Molly' };
const unknownAnimal = { kind: 'bird', name: 'Tweety' };

export const cases: BenchCase[] = [
  {
    name: 'oneOf - simple union, matches 1st rule (pass)',
    fn: () => {
      union('hello');
    },
  },
  {
    name: 'oneOf - simple union, matches 2nd (last) rule (pass)',
    fn: () => {
      union(42);
    },
  },
  {
    name: 'oneOf - simple union, no rule matches (throws)',
    fn: () => {
      try {
        union(true as any);
      } catch {
        // expected
      }
    },
  },
  {
    name: 'oneOf - simple union, no rule matches (.silent())',
    fn: () => {
      union.silent(true as any);
    },
  },
  {
    name: 'oneOf - discriminated, matches 1st branch (pass)',
    fn: () => {
      discriminated(dogInput);
    },
  },
  {
    name: 'oneOf - discriminated, matches 2nd (last) branch (pass)',
    fn: () => {
      discriminated(catInput);
    },
  },
  {
    name: 'oneOf - discriminated, no branch matches (throws)',
    fn: () => {
      try {
        discriminated(unknownAnimal);
      } catch {
        // expected
      }
    },
  },
];
