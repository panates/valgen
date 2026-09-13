import * as datefns from 'date-fns';
import { type Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that the value is a `Date` instance, with an optional
 * precision-trimming step. With `coerce: true`, also accepts a `number`
 * (epoch milliseconds) or a date-like `string` and converts it to a `Date`.
 * Without `coerce`, a date *string* is rejected even if well-formed ISO
 * 8601 - only actual `Date` instances validate by default.
 * @validator isDate
 * @param options - Validation options.
 * @returns The validated `Date` instance, with fields below `trim`'s
 *   precision zeroed out when `trim` is given.
 * @throws `Value is not valid date` if the input isn't (or can't be coerced
 *   into) a valid `Date`.
 * @example
 * ```ts
 * import { isDate, vg } from 'valgen';
 *
 * isDate(new Date(1)); // => new Date(1)
 * isDate('2020-01-10T08:30:15Z', { coerce: true });
 * // => new Date('2020-01-10T08:30:15Z')
 * vg.isDate({ trim: 'day', coerce: true })('2020-05-10T08:30:15.123');
 * // => new Date('2020-05-10T00:00:00')
 * ```
 */
export function isDate(options?: isDate.Options) {
  const trim = options?.trim;
  return validator<Date, Date | number | string>(
    isDate.name,
    (input: any, context: Context, _this) => {
      const coerce = options?.coerce ?? context.coerce;
      let d: Date | undefined;
      if (input instanceof Date) d = input;
      else if (coerce) {
        if (typeof input === 'number') d = new Date(input);
        else if (typeof input === 'string') {
          const parsed = coerceDateString(input);
          if (parsed) {
            d = new Date(parsed.value);
          }
        }
      }
      if (datefns.isValid(d)) {
        setPrecision(d!, trim);
        return d!;
      }
      context.fail(_this, `Value is not valid date`, input, {
        ...options,
      });
    },
    options,
  );
}

export namespace isDate {
  export type Precision =
    | 'year'
    | 'yr'
    | 'month'
    | 'mo'
    | 'day'
    | 'd'
    | 'hours'
    | 'hr'
    | 'minutes'
    | 'min'
    | 'seconds'
    | 'sec'
    | 'milliseconds'
    | 'ms'
    | 'tz';

  export interface Options extends ValidationOptions {
    /** Zeroes out the resulting `Date`'s fields below this precision (e.g. `'day'` zeroes hours/minutes/seconds/ms); only `year` through `seconds` have an effect - `milliseconds`/`ms`/`tz` are no-ops. */
    trim?: Precision;
  }
}

/**
 * Validates that the value is (or, with `coerce: true`, can be normalized
 * into) a date-formatted string within a `[precisionMin, precisionMax]`
 * range. Accepts ISO-8601-like strings as well as `Date`/`number` values
 * when `coerce: true`.
 * @validator isDateString
 * @param options - Validation options.
 * @returns The original string when valid (or, with `coerce: true`, the
 *   normalized/trimmed date string).
 * @throws `Minimum date precision should be <precisionMin>` if the parsed
 *   precision is below `precisionMin`.
 * @throws `Maximum date precision should be <precisionMax>` if the parsed
 *   precision is above `precisionMax` (and the input wasn't already a `Date`).
 * @throws `Value "<input>" is not a valid date string` if the input can't
 *   be parsed as a date at all.
 * @example
 * ```ts
 * import { isDateString, vg } from 'valgen';
 *
 * isDateString('2020-01-10T08:30:15Z'); // => '2020-01-10T08:30:15Z'
 * vg.isDateString({ precisionMin: 'day' })('2020-11-01'); // => '2020-11-01'
 * vg.isDateString({ coerce: true, trim: true, precisionMax: 'day' })('2020-11-01T00:00:00+03:00');
 * // => '2020-11-01'
 * ```
 */
export function isDateString(options?: isDateString.Options) {
  const trim = options?.trim;
  const precisionMax = options?.precisionMax || 'tz';
  const precisionMaxIdx = PRECISION_INDEX[precisionMax] || 8;
  let precisionMin = options?.precisionMin || 'minutes';
  const precisionMinIdx = Math.min(
    precisionMaxIdx,
    PRECISION_INDEX[precisionMin] || 6,
  );
  precisionMin = (PRECISION_INDEX_KEYS[
    PRECISION_INDEX_VALUES.indexOf(precisionMinIdx)
  ] || precisionMin) as any;
  return validator<string, Date | number | string>(
    isDateString.name,
    (input: any, context: Context, _this): Nullish<string> => {
      const coerce = options?.coerce ?? context.coerce;
      const parsed = coerceDateString(input, {
        trimPrecision: trim ? precisionMax : undefined,
        separators: options?.separators,
      });
      if (parsed) {
        if (parsed.precision < precisionMinIdx) {
          context.fail(
            _this,
            `Minimum date precision should be ${precisionMin}`,
            input,
            options,
          );
        }
        if (parsed.precision > precisionMaxIdx && !(input instanceof Date)) {
          context.fail(
            _this,
            `Maximum date precision should be ${precisionMax}`,
            input,
            options,
          );
        }
        return coerce ? parsed.value : input;
      }
      context.fail(
        _this,
        `Value "${input}" is not a valid date string`,
        input,
        options,
      );
    },
    options,
  );
}

export namespace isDateString {
  export type Precision = isDate.Precision;
  export interface Options extends ValidationOptions {
    /** The minimum precision the input string must carry (e.g. `'day'` rejects a bare year). @defaultValue 'minutes' */
    precisionMin?: Precision;
    /** The maximum precision accepted; a string more precise than this fails unless the input was already a `Date`. @defaultValue 'tz' */
    precisionMax?: Precision;
    /** When `coerce: true`, truncates the output string down to `precisionMax` instead of only validating precision. @defaultValue false */
    trim?: boolean;
    /** When coercing, controls whether `-`/`:`/`T` separators are included in the output (`false` produces a compact form like `20201101102345.123`). @defaultValue true */
    separators?: boolean;
  }
}

// noinspection RegExpUnnecessaryNonCapturingGroup
const DATE_PATTERN =
  /^(\d{4})(?:-(0[0-9]|1[0-2]))?(?:-([0-2][0-9]|3[0-1]))?(?:[T ](?:([0-1][0-9]|2[0-4]):([0-5][0-9])(?::([0-5][0-9]))?(?:\.(\d{0,6}))?)?((?:[+-](0[0-9]|1[0-2])(?::(\d{2}))?)|Z)?)?$/;
const DATE_PATTERN2 =
  /^(\d{4,14})(?:\.(\d{1,6}))?(?:(?:([+-])(0[0-9]|1[0-2])(\d{2})?)|Z)?$/;

function coerceDateString(
  input: any,
  options: {
    trimPrecision?: isDate.Precision;
    separators?: boolean;
  } = {},
): Nullish<{
  value: string;
  precision: number;
}> {
  const { trimPrecision } = options;
  const separators = options.separators ?? true;
  const precisionIndex =
    (trimPrecision ? PRECISION_INDEX[trimPrecision] : 9) || 9;
  let dateParts: (string | undefined)[] | undefined;
  let detectedPrecision: number;
  if (input instanceof Date || typeof input === 'number') {
    const d = typeof input === 'number' ? new Date(input) : input;
    if (!datefns.isValid(d)) return;
    dateParts = [
      String(d.getFullYear()).padStart(4, '0'),
      String(d.getMonth() + 1).padStart(2, '0'),
      String(d.getDate()).padStart(2, '0'),
      String(d.getHours()).padStart(2, '0'),
      String(d.getMinutes()).padStart(2, '0'),
      String(d.getSeconds()).padStart(2, '0'),
    ];
    if (precisionIndex >= 7)
      if (d.getMilliseconds() > 0)
        dateParts.push(String(d.getMilliseconds()).padStart(3, '0'));
      else dateParts.push('');
    if (precisionIndex >= 8) {
      const tzOffset = d.getTimezoneOffset();
      const tz =
        (tzOffset > 0 ? '-' : '+') +
        String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0') +
        ':' +
        String(Math.abs(tzOffset) % 60).padStart(2, '0');
      dateParts.push(tz);
    }
  } else if (typeof input === 'string') {
    const d = datefns.parseISO(input);
    let m = DATE_PATTERN.exec(input);
    if (m && datefns.isValid(d)) {
      m.shift();
      dateParts = m;
    } else {
      m = DATE_PATTERN2.exec(input);
      if (m) {
        dateParts = [
          m[1].substring(0, 4),
          m[1].substring(4, 6),
          m[1].substring(6, 8),
          m[1].substring(8, 10),
          m[1].substring(10, 12),
          m[1].substring(12, 14),
          m[2],
          m[3] ? m[3] + m[4] + (m[5] ? ':' + m[5] : '') : '',
        ];
      }
    }
  }
  if (!dateParts) return;
  detectedPrecision = dateParts[7] ? 8 : dateParts.findIndex(v => !v);
  if (detectedPrecision < 0) detectedPrecision = Math.min(dateParts.length, 8);
  let value = dateParts[0] || '0000';
  if (precisionIndex > 1)
    value += (separators ? '-' : '') + (dateParts[1] || '01');
  if (precisionIndex > 2)
    value += (separators ? '-' : '') + (dateParts[2] || '01');
  if (precisionIndex > 3)
    value += (separators ? 'T' : '') + (dateParts[3] || '00');
  if (precisionIndex > 4)
    value += (separators ? ':' : '') + (dateParts[4] || '00');
  if (precisionIndex > 5)
    value += (separators ? ':' : '') + (dateParts[5] || '00');
  if (precisionIndex > 6) value += dateParts[6] ? '.' + dateParts[6] : '';
  if (precisionIndex > 7) value += dateParts[7] || '';
  return {
    value,
    precision: Math.min(precisionIndex, detectedPrecision),
  };
}

const PRECISION_INDEX: Record<isDate.Precision, number> = {
  year: 1,
  yr: 1,
  month: 2,
  mo: 2,
  day: 3,
  d: 3,
  hours: 4,
  hr: 4,
  minutes: 5,
  min: 5,
  seconds: 6,
  sec: 6,
  milliseconds: 7,
  ms: 7,
  tz: 8,
};
const PRECISION_INDEX_KEYS = Object.keys(PRECISION_INDEX);
const PRECISION_INDEX_VALUES = Object.values(PRECISION_INDEX);

function setPrecision(d: Date, precision?: string) {
  switch (precision) {
    case 'year':
    case 'yr': {
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      break;
    }
    case 'month':
    case 'mo': {
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      break;
    }
    case 'day':
    case 'd': {
      d.setHours(0, 0, 0, 0);
      break;
    }
    case 'hours':
    case 'hr': {
      d.setMinutes(0, 0, 0);
      break;
    }
    case 'minutes':
    case 'min': {
      d.setSeconds(0, 0);
      break;
    }
    case 'seconds':
    case 'sec': {
      d.setMilliseconds(0);
      break;
    }
  }
}
