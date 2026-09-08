import { expect } from 'expect';
import { isIP, isIPRange, vg } from 'valgen';

describe('isIP', () => {
  it('should validate value is an IP (any version)', () => {
    expect(isIP('192.168.1.1')).toStrictEqual('192.168.1.1');
    expect(isIP('2001:db8::1')).toStrictEqual('2001:db8::1');
    expect(() => isIP('not-an-ip')).toThrow('Value must be a valid IP');
  });

  it('should validate value is an IP v4', () => {
    const fn = vg.isIP(4);
    expect(fn('10.0.0.1')).toStrictEqual('10.0.0.1');
    expect(() => fn('2001:db8::1')).toThrow('Value must be a valid IP v4');
    expect(() => fn('not-an-ip')).toThrow('Value must be a valid IP v4');
  });

  it('should validate value is an IP v6', () => {
    const fn = vg.isIP(6);
    expect(fn('2001:db8::1')).toStrictEqual('2001:db8::1');
    expect(() => fn('10.0.0.1')).toThrow('Value must be a valid IP v6');
    expect(() => fn('not-an-ip')).toThrow('Value must be a valid IP v6');
  });

  it('should reject non-string and empty values', () => {
    expect(() => isIP(undefined as any)).toThrow('Value must be a valid IP');
    expect(() => isIP(null as any)).toThrow('Value must be a valid IP');
  });
});

describe('isIPRange', () => {
  it('should validate value is an IP range (any version)', () => {
    expect(isIPRange('192.168.1.0/24')).toStrictEqual('192.168.1.0/24');
    expect(isIPRange('2001:db8::/32')).toStrictEqual('2001:db8::/32');
    expect(() => isIPRange('not-a-range')).toThrow(
      'Value must be a valid IP range',
    );
  });

  it('should validate value is an IP v4 range', () => {
    const fn = vg.isIPRange(4);
    expect(fn('192.168.1.0/24')).toStrictEqual('192.168.1.0/24');
    expect(() => fn('2001:db8::/32')).toThrow(
      'Value must be a valid IP v4 range',
    );
    expect(() => fn('192.168.1.0/33')).toThrow(
      'Value must be a valid IP v4 range',
    );
  });

  it('should validate value is an IP v6 range', () => {
    const fn = vg.isIPRange(6);
    expect(fn('2001:db8::/32')).toStrictEqual('2001:db8::/32');
    expect(() => fn('192.168.1.0/24')).toThrow(
      'Value must be a valid IP v6 range',
    );
  });

  it('should reject a value without a subnet mask', () => {
    expect(() => isIPRange('192.168.1.0')).toThrow(
      'Value must be a valid IP range',
    );
  });

  it('should reject non-string and empty values', () => {
    expect(() => isIPRange(undefined as any)).toThrow(
      'Value must be a valid IP range',
    );
    expect(() => isIPRange(null as any)).toThrow(
      'Value must be a valid IP range',
    );
  });
});
