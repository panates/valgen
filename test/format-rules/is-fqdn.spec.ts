import { expect } from 'expect';
import { isFQDN, vg } from 'valgen';

describe('isFQDN', () => {
  it('should validate value is a valid FQDN', () => {
    expect(isFQDN('example.com')).toStrictEqual('example.com');
  });

  it('should throw for invalid FQDN', () => {
    expect(() => isFQDN('not a domain')).toThrow('Value must be valid FQDN');
    expect(() => isFQDN(undefined as any)).toThrow(
      'Value must be valid FQDN',
    );
  });

  it('should reject wildcard domains by default', () => {
    expect(() => isFQDN('*.example.com')).toThrow('Value must be valid FQDN');
  });

  it('should allow wildcard domains with allowWildcard option', () => {
    const fn = vg.isFQDN({ allowWildcard: true });
    expect(fn('*.example.com')).toStrictEqual('*.example.com');
  });
});
