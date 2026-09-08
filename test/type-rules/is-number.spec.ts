import { expect } from 'expect';
import { isNumber } from 'valgen';

describe('isNumber', () => {
  it('should validate value is a number', () => {
    expect(isNumber(1.1)).toStrictEqual(1.1);
    expect(isNumber(-1.4)).toStrictEqual(-1.4);
    expect(isNumber(0)).toStrictEqual(0);
    expect(() => isNumber(undefined)).toThrow('Value must be a number');
    expect(() => isNumber(null)).toThrow('Value must be a number');
    expect(() => isNumber(BigInt(5))).toThrow('Value must be a number');
    expect(() => isNumber('1')).toThrow('Value must be a number');
    expect(() => isNumber(NaN)).toThrow('Value must be a number');
  });

  it('should coerce to integer', () => {
    expect(isNumber('4.5', { coerce: true })).toStrictEqual(4.5);
    expect(isNumber('-3.2', { coerce: true })).toStrictEqual(-3.2);
    expect(isNumber(BigInt(5), { coerce: true })).toStrictEqual(5);
  });

  it('should reject a bigint that loses precision when coerced to number', () => {
    expect(() => isNumber(10000000000000000001n, { coerce: true })).toThrow(
      'Value must be a number',
    );
  });
});
