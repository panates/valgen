import { expect } from 'expect';
import { isURL, vg } from 'valgen';

describe('isURL', () => {
  it('should validate value is a valid URL', () => {
    const url = 'https://example.com';
    expect(isURL(url)).toStrictEqual(url);
  });

  it('should throw for an invalid URL', () => {
    expect(() => isURL('not a url')).toThrow('Value must be a valid URL');
  });

  it('should throw for a non-string value', () => {
    expect(() => isURL(12345 as any)).toThrow('Value must be a valid URL');
  });

  it('should respect the require_protocol option', () => {
    const isURLWithProtocol = vg.isURL({ require_protocol: true });
    expect(isURLWithProtocol('https://example.com')).toStrictEqual(
      'https://example.com',
    );
    expect(() => isURLWithProtocol('example.com')).toThrow(
      'Value must be a valid URL',
    );
  });

  it('should respect the protocols option', () => {
    const isHttpsOnly = vg.isURL({ protocols: ['https'] });
    expect(isHttpsOnly('https://example.com')).toStrictEqual(
      'https://example.com',
    );
    expect(() => isHttpsOnly('http://example.com')).toThrow(
      'Value must be a valid URL',
    );
  });
});
