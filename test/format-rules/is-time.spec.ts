import { expect } from 'expect';
import { isTime } from 'valgen';

describe('isTime', () => {
  it('should validate value is a valid time', () => {
    expect(isTime('12:30', { coerce: true })).toStrictEqual('12:30');
    expect(isTime('12:30.123', { coerce: true })).toStrictEqual('12:30.123');
    expect(isTime('12:30:48.123', { coerce: true })).toStrictEqual(
      '12:30:48.123',
    );
    expect(isTime('1230', { coerce: true })).toStrictEqual('12:30');
    expect(isTime('123048', { coerce: true })).toStrictEqual('12:30:48');
    expect(isTime('123048.123', { coerce: true })).toStrictEqual(
      '12:30:48.123',
    );
    expect(() => isTime(undefined as any)).toThrow(
      'Value must be a valid Time',
    );
    expect(() => isTime('25:00')).toThrow('Value must be a valid Time');
    expect(() => isTime('20:60')).toThrow('Value must be a valid Time');
    expect(() => isTime('20:30:60')).toThrow('Value must be a valid Time');
    expect(() => isTime(null as any)).toThrow('Value must be a valid Time');
    expect(() => isTime(NaN as any)).toThrow('Value must be a valid Time');
    expect(() => isTime('invalid')).toThrow('Value must be a valid Time');
  });

  it('should coerce Date to time string', () => {
    expect(isTime(new Date('2025-01-10T08:30:15'), { coerce: true })).toEqual(
      '08:30:15',
    );
  });
});
