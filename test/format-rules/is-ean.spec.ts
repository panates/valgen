import { expect } from 'expect';
import { isEAN } from 'valgen';

describe('isEAN', () => {
  it('should validate value is a valid EAN', () => {
    const ean = '4006381333931';
    expect(isEAN(ean)).toStrictEqual(ean);
  });

  it('should throw for an invalid EAN', () => {
    expect(() => isEAN('1234567890123')).toThrow(
      'Value must be a valid EAN (European Article Number)',
    );
  });

  it('should throw for a non-string value', () => {
    expect(() => isEAN(123 as any)).toThrow(
      'Value must be a valid EAN (European Article Number)',
    );
  });
});
