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

    expect(() => isDateString('2020-01-10T08')).toThrow();
    expect(() => isDateString('2020-01-10')).toThrow();
    expect(() => isDateString(undefined as any)).toThrow();
    expect(() => isDateString(null as any)).toThrow();
    expect(() => isDateString('invalid')).toThrow();
  });

  it('should validate date string with precisionMin', () => {
    expect(vg.isDateString({ precisionMin: 'day' })('2020-11-01')).toEqual(
      '2020-11-01',
    );
    expect(() => vg.isDateString({ precisionMin: 'day' })('2020')).toThrow();

    expect(vg.isDateString({ precisionMin: 'month' })('2020-11')).toEqual(
      '2020-11',
    );
    expect(() => vg.isDateString({ precisionMin: 'month' })('2020')).toThrow();
  });

  it('should validate date string with precisionMax', () => {
    expect(vg.isDateString({ precisionMax: 'day' })('2020-11-01')).toEqual(
      '2020-11-01',
    );
    expect(() =>
      vg.isDateString({ precisionMax: 'day' })('2020-01-01T13:30'),
    ).toThrow();
  });

  it('should coerce to date with given precision', () => {
    expect(
      vg.isDateString({
        coerce: true,
        trim: true,
        precisionMax: 'min',
        precisionMin: 'yr',
      })('2020-11-01'),
    ).toEqual('2020-11-01T00:00');
    expect(
      vg.isDateString({
        coerce: true,
        trim: true,
        precisionMax: 'ms',
        precisionMin: 'yr',
      })(new Date('2020-11-01T00:00:00.1')),
    ).toEqual('2020-11-01T00:00:00.100');
    expect(
      vg.isDateString({ coerce: true, precisionMin: 'yr' })('2020-11-01'),
    ).toEqual('2020-11-01T00:00:00');
  });

  it('should trim date string to given precision', () => {
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'yr', trim: true })(
        '2020-11-01T00:00:00+03:00',
      ),
    ).toEqual('2020');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'month', trim: true })(
        '2020-11-01T00:00:00+03:00',
      ),
    ).toEqual('2020-11');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'day', trim: true })(
        '2020-11-01',
      ),
    ).toEqual('2020-11-01');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'hours', trim: true })(
        '2020-11-01T10:23:45+03:00',
      ),
    ).toEqual('2020-11-01T10');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'minutes', trim: true })(
        '2020-11-01T10:23:45+03:00',
      ),
    ).toEqual('2020-11-01T10:23');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'seconds', trim: true })(
        '2020-11-01T10:23:45+03:00',
      ),
    ).toEqual('2020-11-01T10:23:45');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'ms', trim: true })(
        '2020-11-01T10:23:45.123+03:00',
      ),
    ).toEqual('2020-11-01T10:23:45.123');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'tz', trim: true })(
        '2020-11-01T10:23:45.123+03:00',
      ),
    ).toEqual('2020-11-01T10:23:45.123' + tz);
  });

  it('should trim Date to given precision', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'yr', trim: true })(d),
    ).toEqual('2020');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'month', trim: true })(d),
    ).toEqual('2020-11');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'day', trim: true })(d),
    ).toEqual('2020-11-01');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'hours', trim: true })(d),
    ).toEqual('2020-11-01T10');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'minutes', trim: true })(d),
    ).toEqual('2020-11-01T10:23');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'seconds', trim: true })(d),
    ).toEqual('2020-11-01T10:23:45');
    expect(
      vg.isDateString({
        coerce: true,
        precisionMax: 'milliseconds',
        trim: true,
      })(d),
    ).toEqual('2020-11-01T10:23:45.123');
    expect(
      vg.isDateString({ coerce: true, precisionMax: 'tz', trim: true })(d),
    ).toEqual('2020-11-01T10:23:45.123+03:00');
  });
});
