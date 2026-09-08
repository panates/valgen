import { expect } from 'expect';
import { isHex } from 'valgen';

describe('isHex', () => {
  it('should validate value is an hexadecimal string', () => {
    expect(isHex('1a2B3c')).toStrictEqual('1a2B3c');
  });

  it('should throw for a non-hexadecimal string', () => {
    expect(() => isHex('zzz')).toThrow('Value must be an hexadecimal string');
  });
});
