import { expect } from 'expect';
import { isSWIFT } from 'valgen';

describe('isSWIFT', () => {
  it('should validate value is a valid BIC/SWIFT code', () => {
    const swift = 'DEUTDEFF500';
    expect(isSWIFT(swift)).toStrictEqual(swift);
  });

  it('should throw for an invalid BIC/SWIFT code', () => {
    expect(() => isSWIFT('1234DEFF')).toThrow(
      'Value must be a valid a BIC (Bank Identification Code) or SWIFT code',
    );
  });

  it('should throw for a non-string value', () => {
    expect(() => isSWIFT(12345 as any)).toThrow(
      'Value must be a valid a BIC (Bank Identification Code) or SWIFT code',
    );
  });
});
