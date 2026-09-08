import { expect } from 'expect';
import { isETHAddress } from 'valgen';

describe('isETHAddress', () => {
  it('should validate value is a valid ETH (Ethereum) address', () => {
    expect(
      isETHAddress('0xb794f5ea0ba39494ce839613fffba74279579268'),
    ).toStrictEqual('0xb794f5ea0ba39494ce839613fffba74279579268');
  });

  it('should throw for an invalid ETH address', () => {
    expect(() => isETHAddress('0xnothex')).toThrow(
      'Value must be valid ETH (Ethereum) address',
    );
  });
});
