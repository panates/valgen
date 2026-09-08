import { expect } from 'expect';
import { isLowercase } from 'valgen';

describe('isLowercase', () => {
  it('should validate value is a lowercase string', () => {
    expect(isLowercase('abc')).toStrictEqual('abc');
  });

  it('should throw for a non-lowercase string', () => {
    expect(() => isLowercase('ABC')).toThrow(
      'Value must be a lowercase string',
    );
  });
});
