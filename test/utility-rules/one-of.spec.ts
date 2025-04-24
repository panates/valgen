import { expect } from 'expect';
import { isNull, isNumber, isObject, isString, vg } from 'valgen';

describe('oneOf', () => {
  it('should return one of valid values', () => {
    const c = vg.oneOf([isNull, isNumber]);
    expect(c(6)).toStrictEqual(6);
    expect(c(null)).toStrictEqual(null);
    expect(() => c('x' as any)).toThrow(
      "Value didn't match one of required rules",
    );
  });

  it('should return one of valid object using discriminator', () => {
    const c = vg.oneOf([
      isString,
      [isObject, { kind: vg.isEqual('dog') }],
      [isObject, { kind: vg.isEqual('cat') }],
      vg.isEqual(5),
    ]);
    expect(
      c({
        kind: 'cat',
        name: 'Molly',
      }),
    ).toStrictEqual({
      kind: 'cat',
      name: 'Molly',
    });
    expect(
      c({
        kind: 'dog',
        name: 'Daisy',
      }),
    ).toStrictEqual({
      kind: 'dog',
      name: 'Daisy',
    });
    expect(c('Daisy')).toStrictEqual('Daisy');
    expect(c(5)).toStrictEqual(5);
    expect(c(null)).toStrictEqual(null);
    expect(() => c(1)).toThrow("Value didn't match one of required rules");
    expect(() =>
      c({
        kind: 'bird',
        name: 'Bluey',
      }),
    ).toThrow("Value didn't match one of required rules");
  });
});
