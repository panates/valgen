import { expect } from 'expect';
import { isAlphanumeric } from 'valgen';

describe('isAlphanumeric', () => {
  it('should validate value is an alphanumeric string', () => {
    expect(isAlphanumeric('abc123')).toStrictEqual('abc123');
  });

  it('should throw for a non-alphanumeric string', () => {
    expect(() => isAlphanumeric('abc-123')).toThrow(
      'Value must be an alphanumeric string',
    );
  });
});
