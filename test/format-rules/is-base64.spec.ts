import { expect } from 'expect';
import { isBase64 } from 'valgen';

describe('isBase64', () => {
  it('should validate value is a Base64 string', () => {
    expect(isBase64('SGVsbG8gV29ybGQ=')).toStrictEqual('SGVsbG8gV29ybGQ=');
  });

  it('should throw for a non-Base64 string', () => {
    expect(() => isBase64('not-base64!!')).toThrow(
      'Value must be a Base64 string',
    );
  });
});
