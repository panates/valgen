import { expect } from 'expect';
import { isDateString, vg } from 'valgen';

describe('isDateString', () => {
  it('should validate date string', () => {
    expect(isDateString('2020-01-10T08:30:15Z')).toEqual(
      '2020-01-10T08:30:15Z',
    );
    expect(isDateString('2020-01-10T08:30:15')).toEqual('2020-01-10T08:30:15');
    expect(isDateString('2020-01-10T08:30:15')).toEqual('2020-01-10T08:30:15');
    expect(isDateString('2020-01-10T08:30')).toEqual('2020-01-10T08:30');
    expect(isDateString('2020-01-10 08:30')).toEqual('2020-01-10 08:30');

    expect(() => isDateString('2020-01-10T08')).toThrow(
      'Value is not valid date string',
    );
    expect(() => isDateString('2020-01-10')).toThrow(
      'Value is not valid date string',
    );
    expect(() => isDateString(undefined as any)).toThrow(
      'Value is not valid date string',
    );
    expect(() => isDateString(null as any)).toThrow(
      'Value is not valid date string',
    );
    expect(() => isDateString('invalid')).toThrow(
      'Value is not valid date string',
    );
  });

  it('should validate date string with precisionMin', () => {
    expect(vg.isDateString({ precisionMin: 'day' })('2020-11-01')).toEqual(
      '2020-11-01',
    );
    expect(() => vg.isDateString({ precisionMin: 'day' })('2020')).toThrow(
      'Value is not valid date string with required precision',
    );

    expect(vg.isDateString({ precisionMin: 'month' })('2020-11')).toEqual(
      '2020-11',
    );
    expect(() => vg.isDateString({ precisionMin: 'month' })('2020')).toThrow(
      'Value is not valid date string with required precision',
    );
  });

  it('should validate date string with precisionMax', () => {
    expect(vg.isDateString({ precisionMax: 'day' })('2020-11-01')).toEqual(
      '2020-11-01',
    );
    expect(() =>
      vg.isDateString({ precisionMax: 'day' })('2020-01-01T13:30'),
    ).toThrow('Value is not valid date string with required precision');
  });

  it('should coerce to date with given precision', () => {
    expect(
      vg.isDateString({
        coerce: true,
        trim: 'min',
        precisionMin: 'yr',
      })('2020-11-01'),
    ).toEqual('2020-11-01T00:00');
    expect(
      vg.isDateString({
        coerce: true,
        trim: 'ms',
        precisionMin: 'yr',
      })(new Date('2020-11-01T00:00:00.1')),
    ).toEqual('2020-11-01T00:00:00.100');
    expect(
      vg.isDateString({ coerce: true, precisionMin: 'yr' })('2020-11-01'),
    ).toEqual('2020-11-01T00:00:00');
  });

  it('should coerce non signed numbers to date string', () => {
    expect(
      vg.isDateString({
        coerce: true,
        precisionMin: 'yr',
      })('20201101'),
    ).toEqual('2020-11-01T00:00:00');
    expect(
      vg.isDateString({
        coerce: true,
        precisionMin: 'yr',
      })('20201101153223.123'),
    ).toEqual('2020-11-01T15:32:23.123');
    expect(
      vg.isDateString({ coerce: true })('20250823000600.0000+0300'),
    ).toEqual('2025-08-23T00:06:00.0000+03:00');
    expect(
      vg.isDateString({
        coerce: true,
        precisionMin: 'yr',
      })('20201101153223.123+03'),
    ).toEqual('2020-11-01T15:32:23.123+03');
    expect(
      vg.isDateString({
        coerce: true,
        precisionMin: 'yr',
      })('20201101153223.123+0330'),
    ).toEqual('2020-11-01T15:32:23.123+03:30');
  });
});
