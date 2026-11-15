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

  it('should coerce strings with UTC+13 and UTC+14 offsets', () => {
    expect(isDate('2024-01-15T13:00:00+13:00', { coerce: true })).toEqual(
      new Date('2024-01-15T00:00:00Z'),
    );
    expect(isDate('2024-01-15T13:45:00+13:45', { coerce: true })).toEqual(
      new Date('2024-01-15T00:00:00Z'),
    );
    expect(isDate('2024-01-15T14:00:00+14:00', { coerce: true })).toEqual(
      new Date('2024-01-15T00:00:00Z'),
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
    expect(vg.isDate({ trim: 'seconds', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:30:15'),
    );
  });

  it('should apply precision using abbreviated precision keys', () => {
    const d = '2020-05-10T08:30:15.123';
    expect(vg.isDate({ trim: 'yr', coerce: true })(d)).toEqual(
      new Date('2020-01-01T00:00:00'),
    );
    expect(vg.isDate({ trim: 'mo', coerce: true })(d)).toEqual(
      new Date('2020-05-01T00:00:00'),
    );
    expect(vg.isDate({ trim: 'd', coerce: true })(d)).toEqual(
      new Date('2020-05-10T00:00:00'),
    );
    expect(vg.isDate({ trim: 'hr', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:00:00'),
    );
    expect(vg.isDate({ trim: 'min', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:30:00'),
    );
    expect(vg.isDate({ trim: 'sec', coerce: true })(d)).toEqual(
      new Date('2020-05-10T08:30:15'),
    );
  });
});
