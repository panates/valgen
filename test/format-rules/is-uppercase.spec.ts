import { expect } from 'expect';
import { isUppercase } from 'valgen';

describe('isUppercase', () => {
  it('should validate value is an uppercase string', () => {
    expect(isUppercase('ABC')).toStrictEqual('ABC');
  });

  it('should throw for a non-uppercase string', () => {
    expect(() => isUppercase('abc')).toThrow(
      'Value must be an uppercase string',
    );
  });
});
