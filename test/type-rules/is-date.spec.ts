import { expect } from 'expect';
import { isDate, vg } from 'valgen';

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
