import { expect } from 'expect';
import { vg } from 'valgen';

describe('isEnum', () => {
  it('should validate value', () => {
    expect(vg.isEnum('a')('a')).toStrictEqual('a');
    expect(vg.isEnum(['a', 'b'])('a')).toStrictEqual('a');
    expect(vg.isEnum(['a', 'b'])('b')).toStrictEqual('b');
    expect(() => vg.isEnum(['a', 'b'])('c')).toThrow('must be one of');
    expect(() => vg.isEnum(['a', 'b'])(undefined as any)).toThrow(
      'must be one of',
    );
    expect(() => vg.isEnum(['a', 'b'])(null as any)).toThrow('must be one of');
  });

  it('should validate value using TypeScript enums', () => {
    enum Enum1 {
      a = 0,
      b = 1,
    }
    enum Enum2 {
      a = 'a',
      b = 'b',
    }
    expect(vg.isEnum(Enum1)(0)).toStrictEqual(0);
    expect(vg.isEnum(Enum2)('a')).toStrictEqual('a');
  });
});
