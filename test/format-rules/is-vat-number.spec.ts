import { expect } from 'expect';
import { vg } from 'valgen';

describe('isVATNumber', () => {
  it('should validate a valid AT VAT number', () => {
    const fn = vg.isVATNumber('AT');
    expect(fn('ATU12345678')).toStrictEqual('ATU12345678');
    expect(() => fn('12345')).toThrow('Value must be a valid VAT number');
  });

  it('should validate a valid DE VAT number', () => {
    const fn = vg.isVATNumber('DE');
    expect(fn('DE123456789')).toStrictEqual('DE123456789');
    expect(() => fn('DE12345')).toThrow('Value must be a valid VAT number');
  });

  it('should validate a valid BE VAT number', () => {
    const fn = vg.isVATNumber('BE');
    expect(fn('BE1234567890')).toStrictEqual('BE1234567890');
    expect(() => fn('BE12345')).toThrow('Value must be a valid VAT number');
  });

  it('should reject non-string and empty values', () => {
    const fn = vg.isVATNumber('DE');
    expect(() => fn(undefined as any)).toThrow(
      'Value must be a valid VAT number',
    );
    expect(() => fn(null as any)).toThrow('Value must be a valid VAT number');
  });
});
