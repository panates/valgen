import { expect } from 'expect';
import { vg } from 'valgen';

describe('isPassportNumber', () => {
  it('should validate a valid US passport number', () => {
    const fn = vg.isPassportNumber('US');
    expect(fn('123456789')).toStrictEqual('123456789');
    expect(() => fn('12345')).toThrow(
      'Value must be a valid US Passport Number',
    );
  });

  it('should validate a valid FR passport number', () => {
    const fn = vg.isPassportNumber('FR');
    expect(fn('12AB34567')).toStrictEqual('12AB34567');
    expect(() => fn('123456789')).toThrow(
      'Value must be a valid FR Passport Number',
    );
  });

  it('should validate a valid TR passport number', () => {
    const fn = vg.isPassportNumber('TR');
    expect(fn('U12345678')).toStrictEqual('U12345678');
    expect(() => fn('123456789')).toThrow(
      'Value must be a valid TR Passport Number',
    );
  });

  it('should reject non-string and empty values', () => {
    const fn = vg.isPassportNumber('US');
    expect(() => fn(undefined as any)).toThrow(
      'Value must be a valid US Passport Number',
    );
    expect(() => fn(null as any)).toThrow(
      'Value must be a valid US Passport Number',
    );
  });
});
