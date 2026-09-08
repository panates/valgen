import { expect } from 'expect';
import { isISSN, vg } from 'valgen';

describe('isISSN', () => {
  it('should validate value is a valid ISSN', () => {
    expect(isISSN('0378-5955')).toStrictEqual('0378-5955');
  });

  it('should throw for invalid ISSN', () => {
    expect(() => isISSN('1234-1234')).toThrow('Value must be a valid ISSN');
    expect(() => isISSN(undefined as any)).toThrow(
      'Value must be a valid ISSN',
    );
  });

  it('should accept lowercase check digit by default', () => {
    expect(isISSN('1000-002x')).toStrictEqual('1000-002x');
  });

  it('should reject lowercase check digit with caseSensitive option', () => {
    const fn = vg.isISSN({ caseSensitive: true });
    expect(fn('1000-002X')).toStrictEqual('1000-002X');
    expect(() => fn('1000-002x')).toThrow('Value must be a valid ISSN');
  });
});
