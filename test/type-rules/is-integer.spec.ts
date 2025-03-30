import { expect } from 'expect';
import { isInteger } from 'valgen';

describe('isInteger', () => {
  it('should validate value is an integer', () => {
    expect(isInteger(1)).toStrictEqual(1);
    expect(isInteger(-1)).toStrictEqual(-1);
    expect(isInteger(0)).toStrictEqual(0);
    expect(() => isInteger(undefined)).toThrow(
      'Value must be a valid integer value',
    );
    expect(() => isInteger(null)).toThrow(
      'Value must be a valid integer value',
    );
    expect(() => isInteger(BigInt(5))).toThrow(
      'Value must be a valid integer value',
    );
    expect(() => isInteger('1')).toThrow('Value must be a valid integer value');
    expect(() => isInteger(NaN)).toThrow('Value must be a valid integer value');
  });

  it('should coerce to integer', () => {
    expect(isInteger('4', { coerce: true })).toStrictEqual(4);
    expect(isInteger('-3', { coerce: true })).toStrictEqual(-3);
    expect(isInteger(BigInt(5), { coerce: true })).toStrictEqual(5);
  });
});
