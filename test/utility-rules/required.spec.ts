import { expect } from 'expect';
import { isNumber, isString, vg } from 'valgen';

describe('isRequired', () => {
  it('should validate required value', () => {
    expect(vg.required(isNumber)(0)).toStrictEqual(0);
    expect(vg.required(isString)('')).toStrictEqual('');
    expect(() => vg.required(isString)(undefined)).toThrow('Value required');
    expect(() => vg.required(isString)(null)).toThrow('Value required');
  });

  it('should set default value', () => {
    expect(vg.required(isNumber, { default: 0 })(undefined)).toStrictEqual(0);
    expect(
      vg.required(isString, { default: 'hello world' })(undefined),
    ).toStrictEqual('hello world');
  });
});
