import { expect } from 'expect';
import { isEmail, vg } from 'valgen';

describe('isEmail', () => {
  it('should validate value is a email', () => {
    expect(isEmail('me@domain.com')).toStrictEqual('me@domain.com');
    expect(() => isEmail(undefined as any)).toThrow(
      'Value must much required e-mail format',
    );
    expect(() => isEmail(null as any)).toThrow(
      'Value must much required e-mail format',
    );
    expect(() => isEmail(NaN as any)).toThrow(
      'Value must much required e-mail format',
    );
    expect(() => isEmail('invalid')).toThrow(
      'Value must much required e-mail format',
    );
  });

  it('should allow display name option', () => {
    const fn = vg.isEmail({ allowDisplayName: true });
    expect(fn('Me <me@domain.com>')).toStrictEqual('Me <me@domain.com>');
    expect(() => isEmail('Me <me@domain.com>')).toThrow(
      'Display name in email is not allowed',
    );
  });

  it('should require display name option', () => {
    const fn = vg.isEmail({ requireDisplayName: true });
    expect(fn('Me <me@domain.com>')).toStrictEqual('Me <me@domain.com>');
    expect(() => fn('me@domain.com')).toThrow(
      'Display name for the email is required',
    );
  });

  it('should allow utf-8 in local part', () => {
    const fn = vg.isEmail({ utf8LocalPart: false });
    expect(isEmail('şiir@domain.com')).toStrictEqual('şiir@domain.com');
    expect(() => fn('şiir@domain.com')).toThrow(
      'Value must much required e-mail format',
    );
  });

  it('should allow ip domain', () => {
    const fn = vg.isEmail({ allowIpDomain: true });
    expect(fn('me@192.168.0.1')).toStrictEqual('me@192.168.0.1');
    expect(() => isEmail('me@192.168.0.1')).toThrow(
      'Value must much required e-mail format',
    );
  });

  it('should check host black list', () => {
    const fn = vg.isEmail({ hostBlacklist: ['domain.com'] });
    expect(() => fn('me@domain.com')).toThrow(
      'Email "me@domain.com" is in black-list',
    );
  });

  it('should check host white list', () => {
    const fn = vg.isEmail({ hostWhitelist: ['domain.com'] });
    expect(fn('me@domain.com')).toStrictEqual('me@domain.com');
    expect(() => fn('me@domain2.com')).toThrow(
      'Email "me@domain2.com" is in not white-list',
    );
  });

  it('should check host black listed chars', () => {
    const fn = vg.isEmail({ blacklistedChars: 'x' });
    expect(fn('me@domain.com')).toStrictEqual('me@domain.com');
    expect(() => fn('x@domain.com')).toThrow('Black listed characters');
  });
});
