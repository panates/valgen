import { expect } from 'expect';
import { isBoolean, isNumber, isString, vg } from 'valgen';

describe('pipe', () => {
  it('should pipe validations', () => {
    expect(vg.pipe([isString, vg.matches(/^[a-z]+$/)])('abc')).toStrictEqual(
      'abc',
    );
    expect(() => vg.pipe([isString, vg.matches(/^[a-z]+$/)])('123')).toThrow(
      'Value must match requested format',
    );
    expect(
      vg.pipe([isString, isNumber, isBoolean])(1 as any, { coerce: true }),
    ).toStrictEqual(true);
    expect(
      vg.pipe([isString, isNumber, isString])(1 as any, { coerce: true }),
    ).toStrictEqual('1');
  });

  it('should define return index', () => {
    expect(
      vg.pipe([isString, isNumber, vg.isGte(5)], { returnIndex: 0 })('123', {
        coerce: true,
      }),
    ).toStrictEqual('123');
    expect(
      vg.pipe([isString, isNumber, vg.isGte(5)], { returnIndex: 1 })('123', {
        coerce: true,
      }),
    ).toStrictEqual(123);
  });
});
