import { expect } from 'expect';
import { isDecimal } from 'valgen';

describe('isDecimal', () => {
  it('should validate value is a decimal number string', () => {
    expect(isDecimal('1.5')).toStrictEqual('1.5');
  });

  it('should throw for a non-decimal string', () => {
    expect(() => isDecimal('abc')).toThrow(
      'Value must be a decimal number string',
    );
  });
});
