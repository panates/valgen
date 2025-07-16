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
    const d = '2020-05-10T08:30:15.123';
    expect(vg.isDate({ precision: 'year', coerce: true })(d)).toEqual(
      new Date('2020-01-01T00:00:00'),
    );
    expect(vg.isDate({ precision: 'month', coerce: true })(d)).toEqual(
      new Date('2020-05-01T00:00:00'),
    );
    expect(vg.isDate({ precision: 'date', coerce: true })(d)).toEqual(
      new Date('2020-05-10T00:00:00'),
    );
    expect(vg.isDate({ precision: 'hours', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:00:00'),
    );
    expect(vg.isDate({ precision: 'minutes', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:30:00'),
    );
  });

  it('should parse string using given formats', () => {
    const d = vg.isDate({
      format: 'dd_MM_yyyy',
    })('12_03_2020', { coerce: true });
    expect(d).toEqual(new Date('2020-03-12T00:00:00'));
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
  it('should validate date string', () => {
    expect(isDateString('2020-01-10T08:30:15Z')).toEqual(
      '2020-01-10T08:30:15Z',
    );
    expect(isDateString('2020-01-10T08:30:15')).toEqual('2020-01-10T08:30:15');
    expect(isDateString('2020-01-10T08:30')).toEqual('2020-01-10T08:30');
    expect(isDateString('2020-01-10 08:30')).toEqual('2020-01-10 08:30');
    expect(isDateString('2020-01-10')).toEqual('2020-01-10');
    expect(isDateString('2020-01')).toEqual('2020-01');
    expect(isDateString('2020', { coerce: true })).toEqual('2020');
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

  it('should validate date string using given formats', () => {
    expect(vg.isDateString({ format: 'dd_MM_yyyy' })('12_03_2020')).toEqual(
      '12_03_2020',
    );
    expect(
      vg.isDateString({ format: ['dd_MM_yyyy', 'dd_MM_yyyy HH_mm'] })(
        '12_03_2020 13_40',
      ),
    ).toEqual('12_03_2020 13_40');
  });

  it('should coerce date instance to date string', () => {
    expect(
      vg.isDateString({ format: 'dd_MM_yyyy', coerce: true })(
        new Date('2020-03-12T10:40:52'),
      ),
    ).toEqual('12_03_2020');
  });
});
