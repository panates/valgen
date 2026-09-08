import { expect } from 'expect';
import { isCreditCard, vg } from 'valgen';

describe('isCreditCard', () => {
  it('should validate value is a valid credit card number', () => {
    const visa = '4111111111111111';
    expect(isCreditCard(visa)).toStrictEqual(visa);
  });

  it('should throw for an invalid credit card number', () => {
    expect(() => isCreditCard('4111111111111112')).toThrow(
      'Value must be a valid Credit Card number',
    );
  });

  it('should throw for a non-string value', () => {
    expect(() => isCreditCard(12345678 as any)).toThrow(
      'Value must be a valid Credit Card number',
    );
  });

  it('should respect the provider option', () => {
    const visa = '4111111111111111';
    const amex = '378282246310005';
    const isVisaCard = vg.isCreditCard({ provider: 'visa' });
    const isAmexCard = vg.isCreditCard({ provider: 'amex' });
    expect(isVisaCard(visa)).toStrictEqual(visa);
    expect(() => isAmexCard(visa)).toThrow(
      'Value must be a valid Credit Card number',
    );
    expect(isAmexCard(amex)).toStrictEqual(amex);
  });
});
