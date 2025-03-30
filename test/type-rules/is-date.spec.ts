import { expect } from 'expect';
import { isDate, isDateString, vg } from 'valgen';

describe('isDate', () => {
  it('should validate value is an instance of Date', () => {
    expect(isDate(new Date(1))).toEqual(new Date(1));
    expect(() => isDate(undefined as any)).toThrow(
      'Value must be a valid date',
    );
    expect(() => isDate(null as any)).toThrow('Value must be a valid date');
    expect(() => isDate(new Date('invalid'))).toThrow(
      'Value must be a valid date',
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
    const d: any = new Date('2020-05-10T08:30:15.123Z');
    expect(vg.isDate({ precision: 'date' })(d)).toEqual(
      new Date('2020-05-10T00:00:00'),
    );
    expect(vg.isDate({ precision: 'month' })(d)).toEqual(
      new Date('2020-05-01T00:00:00'),
    );
    expect(vg.isDate({ precision: 'year' })(d)).toEqual(
      new Date('2020-01-01T00:00:00'),
    );
  });

  it('should validate string format', () => {
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
});

describe('isDateString', () => {
  it('should validate date string with time', () => {
    expect(isDateString('2020-01-10T08:30:15Z')).toEqual(
      '2020-01-10T08:30:15Z',
    );
    expect(isDateString('2020-01-10T08:30:15')).toEqual('2020-01-10T08:30:15');
    expect(isDateString('2020-01-10T08:30')).toEqual('2020-01-10T08:30');
    expect(isDateString('2020-01-10 08:30')).toEqual('2020-01-10 08:30');
    expect(isDateString('2020-01-10')).toEqual('2020-01-10');
    expect(isDateString('2020-01')).toEqual('2020-01');
    expect(isDateString('2020')).toEqual('2020');
    expect(() => isDateString(undefined as any)).toThrow(
      'Value must be a valid date string',
    );
    expect(() => isDateString(null as any)).toThrow(
      'Value must be a valid date string',
    );
    expect(() => isDateString('invalid')).toThrow(
      'Value must be a valid date string',
    );
  });

  it('should validate date string with time - precision = month', () => {
    expect(
      vg.isDateString({ precision: 'month' })('2020-01-10T08:30:15Z'),
    ).toEqual('2020-01-10T08:30:15Z');
    expect(
      vg.isDateString({ precision: 'month' })('2020-01-10T08:30:15'),
    ).toEqual('2020-01-10T08:30:15');
    expect(vg.isDateString({ precision: 'month' })('2020-01-10T08:30')).toEqual(
      '2020-01-10T08:30',
    );
    expect(vg.isDateString({ precision: 'month' })('2020-01-10 08:30')).toEqual(
      '2020-01-10 08:30',
    );
    expect(vg.isDateString({ precision: 'month' })('2020-01-10')).toEqual(
      '2020-01-10',
    );
    expect(vg.isDateString({ precision: 'month' })('2020-01')).toEqual(
      '2020-01',
    );
    expect(() => vg.isDateString({ precision: 'month' })('2020')).toThrow(
      'Value must be a valid date string',
    );
  });

  it('should validate date string with time - precision = date', () => {
    expect(
      vg.isDateString({ precision: 'date' })('2020-01-10T08:30:15Z'),
    ).toEqual('2020-01-10T08:30:15Z');
    expect(
      vg.isDateString({ precision: 'date' })('2020-01-10T08:30:15'),
    ).toEqual('2020-01-10T08:30:15');
    expect(vg.isDateString({ precision: 'date' })('2020-01-10T08:30')).toEqual(
      '2020-01-10T08:30',
    );
    expect(vg.isDateString({ precision: 'date' })('2020-01-10 08:30')).toEqual(
      '2020-01-10 08:30',
    );
    expect(vg.isDateString({ precision: 'date' })('2020-01-10')).toEqual(
      '2020-01-10',
    );
    expect(() => vg.isDateString({ precision: 'date' })('2020-01')).toThrow(
      'Value must be a valid date string',
    );
    expect(() => vg.isDateString({ precision: 'date' })('2020')).toThrow(
      'Value must be a valid date string',
    );
  });

  it('should validate date string with time - precision = datetime', () => {
    expect(
      vg.isDateString({ precision: 'time' })('2020-01-10T08:30:15Z'),
    ).toEqual('2020-01-10T08:30:15Z');
    expect(
      vg.isDateString({ precision: 'time' })('2020-01-10T08:30:15'),
    ).toEqual('2020-01-10T08:30:15');
    expect(vg.isDateString({ precision: 'time' })('2020-01-10T08:30')).toEqual(
      '2020-01-10T08:30',
    );
    expect(vg.isDateString({ precision: 'time' })('2020-01-10 08:30')).toEqual(
      '2020-01-10 08:30',
    );
    expect(() => vg.isDateString({ precision: 'time' })('2020-01-10')).toThrow(
      'Value must be a valid date string',
    );
    expect(() => vg.isDateString({ precision: 'time' })('2020-01')).toThrow(
      'Value must be a valid date string',
    );
    expect(() => vg.isDateString({ precision: 'time' })('2020')).toThrow(
      'Value must be a valid date string',
    );
  });

  it('should coerce string and trim', () => {
    let d: any = new Date('2020-01-10T08:30:15');
    expect(isDateString(d, { coerce: true })).toEqual('2020-01-10T08:30:15');
    expect(vg.isDateString({ trim: 'time' })(d, { coerce: true })).toEqual(
      '2020-01-10T08:30:15',
    );
    expect(vg.isDateString({ trim: 'date' })(d, { coerce: true })).toEqual(
      '2020-01-10',
    );
    d = '2020-01-10T08:30:15.123+03:00';
    expect(vg.isDateString({ trim: 'time' })(d, { coerce: true })).toEqual(
      '2020-01-10T08:30:15',
    );
    expect(vg.isDateString({ trim: 'date' })(d, { coerce: true })).toEqual(
      '2020-01-10',
    );
  });
});
