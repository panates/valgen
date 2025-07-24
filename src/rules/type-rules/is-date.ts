import * as datefns from 'date-fns';
import { type Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

type Precision =
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

export interface IsDateOptions extends ValidationOptions {
  trim?: Precision;
}

/**
 * Validates if value is a "Date" instance or ISO 8601 formatted date string.
 *  if a `coerce` option is `true`, converts input value to Date instance
 * @validator isDate
 */
export function isDate(options?: IsDateOptions) {
  const trim = options?.trim;
  return validator<Date, Date | number | string>(
    'isDate',
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

export interface IsDateStringOptions extends ValidationOptions {
  precisionMin?: Precision;
  precisionMax?: Precision;
  trim?: Precision;
}

/**
 * Validates if value is DFS (date formatted string).
 * Converts input value to DFS if the "coerce" option is set to 'true'.
 * @validator isDateString
 */
export function isDateString(options?: IsDateStringOptions) {
  const precisionMin = options?.precisionMin || 'minutes';
  const precisionMax = options?.precisionMax || 'tz';
  const precisionMaxIdx = PRECISION_INDEX[precisionMax] || 9;
  const precisionMinIdx = Math.min(
    precisionMaxIdx,
    PRECISION_INDEX[precisionMin] || 6,
  );
  return validator<string, Date | number | string>(
    'isDateString',
    (input: any, context: Context, _this): Nullish<string> => {
      const coerce = options?.coerce ?? context.coerce;
      const parsed = coerceDateString(input, options?.trim);
      if (parsed) {
        if (
          parsed.precision >= precisionMinIdx &&
          parsed.precision <= precisionMaxIdx
        ) {
          return coerce ? parsed.value : input;
        }
      }
      context.fail(
        _this,
        `Value is not valid date string` +
          (options?.precisionMin || options?.precisionMax
            ? ` with required precision`
            : ''),
        input,
        {
          ...options,
        },
      );
    },
    options,
  );
}

// noinspection RegExpUnnecessaryNonCapturingGroup
const DATE_PATTERN =
  /^(\d{4})(?:-(0[0-9]|1[0-2]))?(?:-([0-2][0-9]|3[0-1]))?(?:[T ](?:([0-1][0-9]|2[0-4]):([0-5][0-9])(?::([0-5][0-9]))?(?:\.(\d{0,3}))?)?((?:[+-](0[0-9]|1[0-2])(?::(\d{2}))?)|Z)?)?$/;

function coerceDateString(
  input: any,
  precision?: Precision,
): Nullish<{
  value: string;
  precision: number;
}> {
  let dateParts: (string | undefined)[] | undefined;
  let outPrecision = 0;
  if (input instanceof Date || typeof input === 'number') {
    const d = typeof input === 'number' ? new Date(input) : input;
    dateParts = [
      padString(d.getFullYear(), 4),
      padString(d.getMonth() + 1, 2),
      padString(d.getDate(), 2),
      padString(d.getHours(), 2),
      padString(d.getMinutes(), 2),
      padString(d.getSeconds(), 2),
      String(d.getMilliseconds()),
    ];
  } else if (typeof input === 'string') {
    const d = datefns.parseISO(input);
    const m = DATE_PATTERN.exec(input);
    if (m && datefns.isValid(d)) {
      m.shift();
      dateParts = m;
    }
  }
  if (!dateParts) return;
  outPrecision = dateParts.findIndex(v => !v);
  if (outPrecision === -1) outPrecision = dateParts.length + 1;
  const precisionIndex = (precision ? PRECISION_INDEX[precision] : 9) || 9;
  let value = dateParts[0] || '0000';
  if (precisionIndex > 1) value += '-' + (dateParts[1] || '01');
  if (precisionIndex > 2) value += '-' + (dateParts[2] || '01');
  if (precisionIndex > 3) value += 'T' + (dateParts[3] || '00');
  if (precisionIndex > 4) value += ':' + (dateParts[4] || '00');
  if (precisionIndex > 5) value += ':' + (dateParts[5] || '00');
  if (precisionIndex > 6) value += dateParts[6] ? '.' + dateParts[6] : '';
  if (precisionIndex > 7) value += dateParts[7] || '';
  return {
    value,
    precision: outPrecision || 8,
  };
}

const PRECISION_INDEX: Record<Precision, number> = {
  year: 1,
  yr: 1,
  month: 2,
  mo: 2,
  day: 3,
  d: 4,
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

/**
 * Pads a string to the specified length
 * @param value - The string to pad
 * @param len - The desired total length of the resulting string
 * @param padChar - The character to pad with (defaults to '0')
 * @returns The padded string
 */
function padString(
  value: string | number,
  len: number,
  padChar: string = '0',
): string {
  // Convert value to string if it's a number
  const str = String(value);

  // Return original string if it's already longer or equal to target length
  if (str.length >= len) {
    return str;
  }

  // Create padding and concatenate with original string
  const padding = padChar.repeat(len - str.length);
  return padding + str;
}

function setPrecision(d: Date, precision?: string) {
  switch (precision) {
    case 'year': {
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      break;
    }
    case 'month': {
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      break;
    }
    case 'day': {
      d.setHours(0, 0, 0, 0);
      break;
    }
    case 'hours': {
      d.setMinutes(0, 0, 0);
      break;
    }
    case 'minutes': {
      d.setSeconds(0, 0);
      break;
    }
    case 'seconds': {
      d.setMilliseconds(0);
      break;
    }
  }
}
