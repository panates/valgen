import { expect } from 'expect';
import { vg } from '../../src/index.js';

describe('isEqual', () => {
  it('should validate value is equal to given value', () => {
    expect(vg.isEqual('a')('a')).toStrictEqual('a');
    expect(vg.isEqual(1)(1)).toStrictEqual(1);
    expect(vg.isEqual(true)(true)).toStrictEqual(true);
    expect(() => vg.isEqual('a')('b')).toThrow('Value must be equal to');
    expect(() => vg.isEqual(1)(2)).toThrow('Value must be equal to');
    expect(() => vg.isEqual(true)(false)).toThrow('Value must be equal to');
  });
});

describe('isNotEqual', () => {
  it('should validate value is not equal to given value', () => {
    expect(vg.isNotEqual('a')('b')).toStrictEqual('b');
    expect(vg.isNotEqual(1)(2)).toStrictEqual(2);
    expect(vg.isNotEqual(true)(false)).toStrictEqual(false);
    expect(() => vg.isNotEqual('a')('a')).toThrow('Value must not be equal to');
    expect(() => vg.isNotEqual(1)(1)).toThrow('Value must not be equal to');
    expect(() => vg.isNotEqual(true)(true)).toThrow(
      'Value must not be equal to',
    );
  });
});
