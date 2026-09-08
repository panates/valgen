import { expect } from 'expect';
import { isAscii } from 'valgen';

describe('isAscii', () => {
  it('should validate value is an ascii string', () => {
    expect(isAscii('abc123!@#')).toStrictEqual('abc123!@#');
  });

  it('should throw for a non-ascii string', () => {
    expect(() => isAscii('şiir')).toThrow('Value must be an ascii string');
  });
});
