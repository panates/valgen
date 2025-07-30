import { expect } from 'expect';
import { isDate, isDateString, vg } from 'valgen';

describe('isDate', () => {
  it('should validate value is an instance of Date', () => {
    expect(isDate(new Date(1))).toEqual(new Date(1));
    expect(() => isDate(undefined as any)).toThrow('Value is not valid date');
    expect(() => isDate(null as any)).toThrow('Value is not valid date');
    expect(() => isDate(new Date('invalid'))).toThrow(
      'Value is not valid date',
    );
    expect(() => isDate('2020-01-10T08:30:15Z')).toThrow(
      'Value is not valid date',
    );
  });

  it('should coerce to Date', () => {
    expect(isDate(1, { coerce: true })).toEqual(new Date(1));
    expect(isDate('2020-01-10T08:30:15Z', { coerce: true })).toEqual(
      new Date('2020-01-10T08:30:15Z'),
    );
    expect(isDate('2020-01-10T08:30:15', { coerce: true })).toEqual(
      new Date('2020-01-10T08:30:15'),
    );
    expect(isDate('2020-01-10', { coerce: true })).toEqual(
      new Date('2020-01-10T00:00:00'),
    );
    expect(isDate('2020', { coerce: true })).toEqual(
      new Date('2020-01-01T00:00:00'),
    );
  });

  it('should apply precision', () => {
    const d = '2020-05-10T08:30:15.123';
    expect(vg.isDate({ trim: 'year', coerce: true })(d)).toEqual(
      new Date('2020-01-01T00:00:00'),
    );
    expect(vg.isDate({ trim: 'month', coerce: true })(d)).toEqual(
      new Date('2020-05-01T00:00:00'),
    );
    expect(vg.isDate({ trim: 'day', coerce: true })(d)).toEqual(
      new Date('2020-05-10T00:00:00'),
    );
    expect(vg.isDate({ trim: 'hours', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:00:00'),
    );
    expect(vg.isDate({ trim: 'minutes', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:30:00'),
    );
  });
});

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
  });
});
