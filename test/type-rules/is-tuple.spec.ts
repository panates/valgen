import { expect } from 'expect';
import { isBoolean, isInteger, isNumber, isString, vg } from 'valgen';

describe('isTuple', () => {
  it('should validate value is an array', () => {
    expect(vg.isTuple([isBoolean])([true])).toStrictEqual([true]);
    expect(vg.isTuple([isInteger])([1])).toStrictEqual([1]);
    expect(() => vg.isTuple([isBoolean])(undefined as any)).toThrow(
      'Value must be a tuple',
    );
    expect(() => vg.isTuple([isBoolean])(null as any)).toThrow(
      'Value must be a tuple',
    );
    expect(() => vg.isTuple([isBoolean])(5 as any)).toThrow(
      'Value must be a tuple',
    );
    expect(() => vg.isTuple([isBoolean])(NaN as any)).toThrow(
      'Value must be a tuple',
    );
  });

  it('should validate items according to item rule', () => {
    expect(() => vg.isTuple([isInteger])(['1'])).toThrow(
      'Value must be a valid integer value',
    );
  });

  it('should coerce value to tuple', () => {
    expect(vg.isTuple([isString])([0], { coerce: true })).toStrictEqual(['0']);
    expect(
      vg.isTuple([isString, isNumber, isBoolean])([1, '2', 0], {
        coerce: true,
      }),
    ).toStrictEqual(['1', 2, false]);
  });

  it('should coerce a non-array value into a single-item tuple', () => {
    expect(vg.isTuple([isString])('a' as any, { coerce: true })).toStrictEqual([
      'a',
    ]);
  });

  it('should reject arrays with the wrong number of elements', () => {
    expect(() => vg.isTuple([isString, isNumber])(['a'] as any)).toThrow(
      'Value must be a tuple of length 2',
    );
    expect(() =>
      vg.isTuple([isString, isNumber])(['a', 1, 'extra'] as any),
    ).toThrow('Value must be a tuple of length 2');
  });

  it('should prefix each item label with the tuple label and index', () => {
    try {
      vg.isTuple([isInteger], { label: 'Point' })(['x'] as any);
      throw new Error('should have thrown');
    } catch (e: any) {
      expect(e.issues[0].label).toStrictEqual('Point[0]');
    }
  });

  it('should fall back to a generic label when none is given', () => {
    try {
      vg.isTuple([isInteger])(['x'] as any);
      throw new Error('should have thrown');
    } catch (e: any) {
      expect(e.issues[0].label).toStrictEqual('Value at [0]');
    }
  });
});
