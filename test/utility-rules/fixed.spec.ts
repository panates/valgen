import { expect } from 'expect';
import { vg } from 'valgen';

describe('fixed', () => {
  it('should validate value exists', () => {
    expect(vg.fixed(0)(1)).toStrictEqual(0);
    expect(vg.fixed(null)(1)).toStrictEqual(null);
  });
});
