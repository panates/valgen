import { expect } from 'expect';
import { isMobilePhone, vg } from 'valgen';

describe('isMobilePhone', () => {
  it('should validate value is a valid mobile phone number (default any locale)', () => {
    expect(isMobilePhone('+14155552671')).toStrictEqual('+14155552671');
  });

  it('should throw for invalid mobile phone number', () => {
    expect(() => isMobilePhone('12345')).toThrow(
      'Value must be a valid Mobile Phone Number',
    );
    expect(() => isMobilePhone(undefined as any)).toThrow(
      'Value must be a valid Mobile Phone Number',
    );
  });

  it('should validate using an explicit locale', () => {
    const fn = vg.isMobilePhone({ locale: 'en-US' });
    expect(fn('+14155552671')).toStrictEqual('+14155552671');
    expect(() => fn('not-a-phone')).toThrow(
      'Value must be a valid Mobile Phone Number',
    );
  });

  it('should validate using an array of locales', () => {
    const fn = vg.isMobilePhone({ locale: ['en-US', 'tr-TR'] });
    expect(fn('+905321234567')).toStrictEqual('+905321234567');
    expect(() => fn('12345')).toThrow(
      'Value must be a valid Mobile Phone Number',
    );
  });

  it('should require country code with strictMode option', () => {
    const fn = vg.isMobilePhone({ locale: 'tr-TR', strictMode: true });
    expect(fn('+905321234567')).toStrictEqual('+905321234567');
    expect(() => fn('5321234567')).toThrow(
      'Value must be a valid Mobile Phone Number',
    );
  });
});
