import { expect } from 'expect';
import { isNumber, isString, vg } from 'valgen';

describe('nullable', () => {
  it('should validate optional value', () => {
    expect(vg.nullable(isNumber)(0)).toStrictEqual(0);
    expect(vg.nullable(isString)('')).toStrictEqual('');
    expect(vg.nullable(isString)(undefined)).toStrictEqual(undefined);
    expect(vg.nullable(isString)(null)).toStrictEqual(null);
  });
});
