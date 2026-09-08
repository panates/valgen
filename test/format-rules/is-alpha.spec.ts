import { expect } from 'expect';
import { isAlpha } from 'valgen';

describe('isAlpha', () => {
  it('should validate value is an alpha string', () => {
    expect(isAlpha('abcDEF')).toStrictEqual('abcDEF');
  });

  it('should throw for a non-alpha string', () => {
    expect(() => isAlpha('abc123')).toThrow('Value must be an alpha string');
  });
});
