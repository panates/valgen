import { expect } from 'expect';
import { isNumber, vg } from 'valgen';

describe('allOf', () => {
  it('should check all validation rules passes', () => {
    const codec = vg.allOf([isNumber, vg.isGt(5), vg.isLt(10)]);
    expect(() => codec(6)).not.toThrow();
    expect(() => codec('x')).toThrow('Value must be a number');
    expect(() => codec(5)).toThrow('must be greater than');
    expect(() => codec(10)).toThrow('must be lover than');
  });
});
