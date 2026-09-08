import { expect } from 'expect';
import { isJWT } from 'valgen';

describe('isJWT', () => {
  it('should validate value is a valid JWT token', () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
    expect(isJWT(jwt)).toStrictEqual(jwt);
  });

  it('should throw for an invalid JWT token', () => {
    expect(() => isJWT('abc.def')).toThrow('Value must be valid JWT token');
  });
});
