import { expect } from 'expect';
import { isArray, isBoolean, isInteger, isString, vg } from 'valgen';

describe('isArray', () => {
  it('should validate value is an array', () => {
    expect(isArray([true])).toStrictEqual([true]);
    expect(isArray([1])).toStrictEqual([1]);
    expect(() => isArray(undefined)).toThrow('Value must be an array');
    expect(() => isArray(null)).toThrow('Value must be an array');
    expect(() => isArray(5 as any)).toThrow('Value must be an array');
    expect(() => isArray(NaN as any)).toThrow('Value must be an array');
  });

  it('should validate items according to item rule', () => {
    expect(vg.isArray(isInteger)([1, 2])).toStrictEqual([1, 2]);
    expect(() => vg.isArray(isInteger)(['1', '2'])).toThrow(
      'Item at index [0] is not a valid. Value must be a valid integer value',
    );
  });

  it('should coerce value to array', () => {
    expect(vg.isArray(isBoolean)([1], { coerce: true })).toStrictEqual([true]);
    expect(vg.isArray(isString)([false, '1'], { coerce: true })).toStrictEqual([
      'false',
      '1',
    ]);
  });
});
