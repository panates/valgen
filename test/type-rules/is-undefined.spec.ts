import { expect } from 'expect';
import { isUndefined } from 'valgen';

describe('isUndefined', () => {
  it('should validate value is undefined', () => {
    expect(isUndefined(undefined)).toStrictEqual(undefined);
    expect(() => isUndefined('' as any)).toThrow('Value must be undefined');
    expect(() => isUndefined(5 as any)).toThrow('Value must be undefined');
    expect(() => isUndefined(null as any)).toThrow('Value must be undefined');
    expect(() => isUndefined(NaN as any)).toThrow('Value must be undefined');
  });

  it('should coerce to undefined', () => {
    expect(isUndefined(0, { coerce: true })).not.toBeDefined();
    expect(isUndefined(1, { coerce: true })).not.toBeDefined();
    expect(isUndefined(undefined, { coerce: true })).not.toBeDefined();
    expect(isUndefined(null, { coerce: true })).not.toBeDefined();
  });
});
