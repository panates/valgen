import { expect } from 'expect';
import { isAny, isString, vg } from 'valgen';

describe('isRecord', () => {
  it('should validate value is an object', () => {
    const validate = vg.isRecord(isString, isAny);
    expect(() => validate(null as any)).toThrow('must be an object');
    expect(() => validate(undefined as any)).toThrow('must be an object');
  });

  it('should validates keys according to given codec', () => {
    expect(() =>
      vg.isRecord(vg.matches(/^[a-z]+$/), isAny)({ UpperKey: 'a' }),
    ).toThrow('UpperKey is not a valid key. Value must match requested format');
  });

  it('should validates values according to given codec', () => {
    expect(() =>
      vg.isRecord(isString, vg.matches(/^[a-z]+$/))({ id: 'UpperValue' }),
    ).toThrow('Value must match requested format');
  });

  it('should coerce values according to given codec', () => {
    expect(
      vg.isRecord(isString, isString)(
        { a: 1 as any, b: true as any },
        { coerce: true },
      ),
    ).toEqual({
      a: '1',
      b: 'true',
    });
  });
});
