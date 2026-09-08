import { expect } from 'expect';
import { isBigint } from 'valgen';

describe('isBigint', () => {
  it('should validate value is an integer', () => {
    expect(isBigint(1n)).toStrictEqual(1n);
    expect(isBigint(-1n)).toStrictEqual(-1n);
    expect(isBigint(0n)).toStrictEqual(0n);
    expect(() => isBigint(undefined)).toThrow('Value must be a BigInt');
    expect(() => isBigint(null)).toThrow('Value must be a BigInt');
    expect(() => isBigint('1')).toThrow('Value must be a BigInt');
    expect(() => isBigint(NaN)).toThrow('Value must be a BigInt');
    // A plain number must not be silently accepted without coerce - only
    // an actual bigint should pass by default.
    expect(() => isBigint(5)).toThrow('Value must be a BigInt');
  });

  it('should coerce to BigInt', () => {
    expect(isBigint('4', { coerce: true })).toStrictEqual(4n);
    expect(isBigint('-3', { coerce: true })).toStrictEqual(-3n);
    expect(isBigint(5, { coerce: true })).toStrictEqual(5n);
    // A non-integer number can't become a BigInt - should fail cleanly
    // instead of leaking the internal RangeError message.
    expect(() => isBigint(5.5, { coerce: true })).toThrow(
      'Value must be a BigInt',
    );
  });
});
