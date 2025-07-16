import * as dateFns from 'date-fns';
import { type Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

export interface IsDateOptions extends ValidationOptions {
  /**
   * Format(s) to be used for parsing
   */
  format?: string | string[];
  /**
   * Tries to parse date against all ISO 8601 formats. Default "true" if no format is given
   */
  parseISO?: boolean;
  precision?: 'year' | 'month' | 'date' | 'hours' | 'minutes' | 'seconds';
}

/**
 * Validates if value is an instance of "Date".
 * Converts input value to Date if a coerce option is set to 'true'.
 * @validator isDate
 */
export function isDate(options?: IsDateOptions) {
  const precision = options?.precision;
  const parser = dateParser(options);
  return validator<Date, Date | number | string>(
    'isDate',
    (input: any, context: Context, _this) => {
      const coerce = options?.coerce || context.coerce;
      const d = parser(input);
      if (d) {
        if (coerce) {
          if (precision) {
            switch (precision) {
              case 'year':
                d.setHours(0, 0, 0, 0);
                d.setMonth(0, 1);
                break;
              case 'month':
                d.setHours(0, 0, 0, 0);
                d.setDate(1);
                break;
            }
            if (precision === 'date') d.setHours(0, 0, 0, 0);
            if (precision === 'hours') d.setMinutes(0, 0, 0);
            if (precision === 'minutes') d.setSeconds(0, 0);
            if (precision === 'seconds') d.setMilliseconds(0);
          }
          return d;
        }
        return input;
      }
      context.fail(_this, `Value must be a valid date`, input, {
        ...options,
      });
    },
    options,
  );
}

export interface IsDateStringOptions extends ValidationOptions {
  /**
   * Format(s) to be tested. If multiple formats are given, the first one will be used to coerce operation
   */
  format?: string | string[];
  /**
   * Tries to parse date against all ISO 8601 formats. Default "true" if no format is given
   */
  parseISO?: boolean;
}

/**
 * Validates if value is DFS (date formatted string).
 * Converts input value to DFS if the "coerce" option is set to 'true'.
 * @validator isDateString
 */
export function isDateString(options?: IsDateStringOptions) {
  const format = Array.isArray(options?.format)
    ? options.format[0]
    : options?.format;
  const parser = dateParser(options);
  return validator<string, Date | number | string>(
    'isDateString',
    (input: any, context: Context, _this): Nullish<string> => {
      const coerce = options?.coerce || context.coerce;
      const d = parser(input);
      if (d) {
        if (!coerce || typeof input === 'string') return input;
        return dateFns.format(d!, format || "yyyy-MM-dd'T'HH:mm:ss.SSS");
      }
      context.fail(_this, `Value must be a valid date string`, input, {
        ...options,
      });
    },
    options,
  );
}

function dateParser(options?: IsDateStringOptions) {
  const formats = options?.format
    ? Array.isArray(options.format)
      ? options.format
      : [options.format]
    : [];
  const refDate = new Date();
  const parseISO = options?.parseISO ?? formats.length === 0;
  return (input: any): Nullish<Date> => {
    let d: Date | undefined;
    if (typeof input === 'number') {
      return new Date(input);
    }
    if (typeof input === 'string') {
      for (let i = 0; i < formats.length; i++) {
        const format = formats[i];
        d = dateFns.parse(input, format, refDate);
        if (dateFns.isValid(d)) return d;
      }
      if (!d && parseISO) d = dateFns.parseISO(input);
      if (dateFns.isValid(d)) return d;
    } else if (input instanceof Date && dateFns.isValid(input)) return input;
  };
}
