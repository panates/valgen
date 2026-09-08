import { expect } from 'expect';
import { isMACAddress, vg } from 'valgen';

describe('isMACAddress', () => {
  it('should validate value is a valid MAC address (with separators)', () => {
    expect(isMACAddress('01:02:03:04:05:ab')).toStrictEqual(
      '01:02:03:04:05:ab',
    );
  });

  it('should throw for invalid MAC address', () => {
    expect(() => isMACAddress('not-a-mac')).toThrow(
      'Value must be a valid MAC address',
    );
    expect(() => isMACAddress(undefined as any)).toThrow(
      'Value must be a valid MAC address',
    );
  });

  it('should reject a MAC address without separators by default', () => {
    expect(() => isMACAddress('0102030405ab')).toThrow(
      'Value must be a valid MAC address',
    );
  });

  it('should validate a MAC address without separators using noSeparators option', () => {
    const fn = vg.isMACAddress({ noSeparators: true });
    expect(fn('0102030405ab')).toStrictEqual('0102030405ab');
    expect(() => fn('01:02:03:04:05:ab')).toThrow(
      'Value must be a valid MAC address',
    );
  });
});
