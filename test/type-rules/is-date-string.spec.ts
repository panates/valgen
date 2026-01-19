import { expect } from 'expect';
import { isDateString, vg } from 'valgen';

let tz = '';
{
  const d = new Date();
  const tzOffset = d.getTimezoneOffset();
  tz =
    tzOffset > 0
      ? '-'
      : '+' +
        String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0') +
        ':' +
        String(Math.abs(tzOffset) % 60).padStart(2, '0');
}

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

  it('should trim to given precision', () => {
    expect(
      vg.isDateString({ coerce: true, trim: 'yr' })(
        '2020-11-01T00:00:00+03:00',
      ),
    ).toEqual('2020');
    expect(
      vg.isDateString({ coerce: true, trim: 'month' })(
        '2020-11-01T00:00:00+03:00',
      ),
    ).toEqual('2020-11');
    expect(
      vg.isDateString({ coerce: true, trim: 'day' })('2020-11-01'),
    ).toEqual('2020-11-01');
    expect(
      vg.isDateString({ coerce: true, trim: 'hours' })(
        '2020-11-01T10:23:45+03:00',
      ),
    ).toEqual('2020-11-01T10');
    expect(
      vg.isDateString({ coerce: true, trim: 'minutes' })(
        '2020-11-01T10:23:45+03:00',
      ),
    ).toEqual('2020-11-01T10:23');
    expect(
      vg.isDateString({ coerce: true, trim: 'seconds' })(
        '2020-11-01T10:23:45+03:00',
      ),
    ).toEqual('2020-11-01T10:23:45');
    expect(
      vg.isDateString({ coerce: true, trim: 'ms' })(
        '2020-11-01T10:23:45.123+03:00',
      ),
    ).toEqual('2020-11-01T10:23:45.123');
    expect(
      vg.isDateString({ coerce: true, trim: 'tz' })(
        '2020-11-01T10:23:45.123+03:00',
      ),
    ).toEqual('2020-11-01T10:23:45.123' + tz);
  });

  it('should coerce Date to date string', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(vg.isDateString({ coerce: true, trim: 'yr' })(d)).toEqual('2020');
    expect(vg.isDateString({ coerce: true, trim: 'month' })(d)).toEqual(
      '2020-11',
    );
    expect(vg.isDateString({ coerce: true, trim: 'day' })(d)).toEqual(
      '2020-11-01',
    );
    expect(vg.isDateString({ coerce: true, trim: 'hours' })(d)).toEqual(
      '2020-11-01T10',
    );
    expect(vg.isDateString({ coerce: true, trim: 'minutes' })(d)).toEqual(
      '2020-11-01T10:23',
    );
    expect(vg.isDateString({ coerce: true, trim: 'seconds' })(d)).toEqual(
      '2020-11-01T10:23:45',
    );
    expect(vg.isDateString({ coerce: true, trim: 'milliseconds' })(d)).toEqual(
      '2020-11-01T10:23:45.123',
    );
    expect(vg.isDateString({ coerce: true, trim: 'tz' })(d)).toEqual(
      '2020-11-01T10:23:45.123+03:00',
    );
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
