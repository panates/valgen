import { isETHAddress as validate } from 'valgen';
import type { BenchCase } from '../harness.js';

// The source (src/rules/format-rules/is-eth-address.ts) exports
// `isETHAddress`, not `isEthAddress` - both the bench filename and the
// import here match the real exported name. Values are reused from
// test/format-rules/is-eth-address.spec.ts.

export const cases: BenchCase[] = [
  {
    name: 'isETHAddress - valid input (pass)',
    fn: () => {
      validate('0xb794f5ea0ba39494ce839613fffba74279579268');
    },
  },
  {
    name: 'isETHAddress - invalid input (throws)',
    fn: () => {
      try {
        validate('0xnothex');
      } catch {
        // expected
      }
    },
  },
  {
    name: 'isETHAddress - invalid input (.silent())',
    fn: () => {
      validate.silent('0xnothex');
    },
  },
];
