import { expect } from 'expect';
import { isIBAN, vg } from 'valgen';

describe('isIBAN', () => {
  it('should validate value is a valid IBAN', () => {
    const iban = 'DE89370400440532013000';
    expect(isIBAN(iban)).toStrictEqual(iban);
  });

  it('should respect the whitelist option', () => {
    const iban = 'DE89370400440532013000';
    expect(vg.isIBAN({ whitelist: ['DE'] })(iban)).toStrictEqual(iban);
    expect(() => vg.isIBAN({ whitelist: ['GB'] })(iban)).toThrow(
      'Value must be a valid IBAN (International Bank Account Number)',
    );
  });

  it('should respect the blacklist option', () => {
    const iban = 'DE89370400440532013000';
    expect(vg.isIBAN({ blacklist: ['GB'] })(iban)).toStrictEqual(iban);
    expect(() => vg.isIBAN({ blacklist: ['DE'] })(iban)).toThrow(
      'Value must be a valid IBAN (International Bank Account Number)',
    );
  });

  it('should throw for an invalid IBAN', () => {
    expect(() => isIBAN('DE89370400440532013001')).toThrow(
      'Value must be a valid IBAN (International Bank Account Number)',
    );
  });

  it('should throw for a non-string value', () => {
    expect(() => isIBAN(12345 as any)).toThrow(
      'Value must be a valid IBAN (International Bank Account Number)',
    );
  });
});
