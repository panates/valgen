import { expect } from 'expect';
import { isDateString, toDateString, vg } from 'valgen';

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

  it('should hide seperators', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(
      vg.isDateString({
        coerce: true,
        separators: false,
        trim: true,
        precisionMax: 'ms',
      })(d),
    ).toEqual('20201101102345.123');
  });

  it('should not append a fractional part for a Date with zero milliseconds', () => {
    const d = new Date('2020-11-01T10:23:45.000');
    expect(
      vg.isDateString({ coerce: true, trim: true, precisionMax: 'ms' })(d),
    ).toStrictEqual('2020-11-01T10:23:45');
  });

  it('should accept a compact (separator-less) date string as input', () => {
    expect(vg.isDateString({ precisionMin: 'day' })('20201101')).toStrictEqual(
      '20201101',
    );
    expect(
      vg.isDateString({
        coerce: true,
        trim: true,
        precisionMin: 'day',
        precisionMax: 'day',
      })('20201101'),
    ).toStrictEqual('2020-11-01');
    expect(
      vg.isDateString({
        coerce: true,
        trim: true,
        precisionMin: 'yr',
        precisionMax: 'ms',
      })('20201101102345.123+0300'),
    ).toStrictEqual('2020-11-01T10:23:45.123');
  });

  it('should accept a compact timezone suffix with no minutes part', () => {
    expect(
      vg.isDateString({
        coerce: true,
        trim: true,
        precisionMin: 'yr',
        precisionMax: 'tz',
      })('20201101102345+03'),
    ).toStrictEqual('2020-11-01T10:23:45+03');
  });

  it('should reject an invalid number input', () => {
    expect(() => vg.isDateString({ coerce: true })(NaN)).toThrow(
      'is not a valid date string',
    );
  });

  it('should use a "-" timezone sign for offsets behind UTC', () => {
    const original = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = function () {
      return 300; // UTC-05:00, e.g. New York standard time
    };
    try {
      const d = new Date('2020-11-01T10:23:45.123');
      expect(
        vg.isDateString({ coerce: true, trim: true, precisionMax: 'tz' })(d),
      ).toStrictEqual('2020-11-01T10:23:45.123-05:00');
    } finally {
      Date.prototype.getTimezoneOffset = original;
    }
  });
});

describe('toDateString', () => {
  it('should coerce to a date string at millisecond precision by default', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(toDateString(d)).toStrictEqual('2020-11-01T10:23:45.123');
  });

  it('should coerce a string input', () => {
    expect(toDateString('2020-11-01T10:23')).toStrictEqual(
      '2020-11-01T10:23:00',
    );
  });

  it('should apply the requested trim precision', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(toDateString(d, { trim: 'day' })).toStrictEqual('2020-11-01');
    expect(toDateString(d, { trim: 'hours' })).toStrictEqual(
      '2020-11-01T10',
    );
  });

  it('should not mix up cached validators across different precisions', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(toDateString(d, { trim: 'day' })).toStrictEqual('2020-11-01');
    expect(toDateString(d, { trim: 'ms' })).toStrictEqual(
      '2020-11-01T10:23:45.123',
    );
    // repeating an already-cached precision should still produce the same result
    expect(toDateString(d, { trim: 'day' })).toStrictEqual('2020-11-01');
  });

  it('should hide separators when requested', () => {
    const d = new Date('2020-11-01T10:23:45.123');
    expect(
      toDateString(d, { trim: 'ms', separators: false }),
    ).toStrictEqual('20201101102345.123');
  });
});
