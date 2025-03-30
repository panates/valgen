import { expect } from 'expect';
import { vg } from 'valgen';

describe('isRegExp', () => {
  it('should return undefined if nullish', () => {
    expect(vg.matches('\\d+')(null as any)).toStrictEqual(undefined);
    expect(vg.matches('\\d+')(undefined as any)).toStrictEqual(undefined);
  });

  it('should validate value matches given pattern', () => {
    expect(vg.matches('\\d+')('0123')).toStrictEqual('0123');
    expect(vg.matches(/\d+/)('0123')).toStrictEqual('0123');
    expect(() => vg.matches(/\d+/)('abc')).toThrow(
      'Value must match requested format',
    );
    expect(() =>
      vg.matches(/\d+/, { formatName: 'positive number' })('abc'),
    ).toThrow('Value must match positive number format');
  });
});
