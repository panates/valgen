import { expect } from 'expect';
import { isHexColor } from 'valgen';

describe('isHexColor', () => {
  it('should validate value is a valid Hex Color', () => {
    expect(isHexColor('#fff')).toStrictEqual('#fff');
  });

  it('should throw for an invalid Hex Color', () => {
    expect(() => isHexColor('notacolor')).toThrow(
      'Value must be a valid Hex Color',
    );
  });
});
