import { vg } from 'valgen';
import type { BenchCase } from '../harness.js';

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

const validate = vg.isInstanceOf(Point);
const validPoint = new Point(1, 2);

export const cases: BenchCase[] = [
  {
    name: 'isInstanceOf - valid input (pass)',
    fn: () => {
      validate(validPoint);
    },
  },
  {
    name: 'isInstanceOf - invalid input (throws)',
    fn: () => {
      try {
        validate('not-a-point');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isInstanceOf - invalid input (.silent())',
    fn: () => {
      validate.silent('not-a-point');
    },
  },
];
