import { expect } from 'expect';
import { isBtcAddress } from 'valgen';

describe('isBtcAddress', () => {
  it('should validate value is a valid BTC address', () => {
    expect(isBtcAddress('1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2')).toStrictEqual(
      '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    );
  });

  it('should throw for an invalid BTC address', () => {
    expect(() => isBtcAddress('notabtcaddress')).toThrow(
      'Value must be a valid BTC address',
    );
  });
});
