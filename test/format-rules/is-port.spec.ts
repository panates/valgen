import { expect } from 'expect';
import { isPort } from 'valgen';

describe('isPort', () => {
  it('should validate value is a valid port number', () => {
    expect(isPort('80')).toStrictEqual(80);
    expect(isPort(80)).toStrictEqual(80);
  });

  it('should throw for invalid port numbers', () => {
    expect(() => isPort('70000')).toThrow('Value must be a valid port number');
    expect(() => isPort('-1')).toThrow('Value must be a valid port number');
    expect(() => isPort('abc')).toThrow('Value must be a valid port number');
  });

  it('should throw for null/undefined input', () => {
    expect(() => isPort(undefined as any)).toThrow(
      'Value must be a valid port number',
    );
    expect(() => isPort(null as any)).toThrow(
      'Value must be a valid port number',
    );
  });
});
