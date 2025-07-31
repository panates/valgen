import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

export interface IsTimeOptions extends ValidationOptions {}

const TIME_PATTERN = /^(\d{2}):?(\d{2})(?::?(\d{2})?(?:\.(\d{1,3}))?)?$/;

/**
 * Validates if value is a time formatted string
 * @validator isTime
 */
export function isTime(options?: IsTimeOptions) {
  return validator<string, string | Date>(
    'isTime',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (input != null) {
        const coerce = options?.coerce ?? context.coerce;
        let str: any;
        if (input instanceof Date && coerce) {
          str =
            String(input.getHours()).padStart(2, '0') +
            ':' +
            String(input.getMinutes()).padStart(2, '0') +
            ':' +
            String(input.getSeconds()).padStart(2, '0');
          if (input.getMilliseconds()) {
            str += '.' + String(input.getMilliseconds()).padStart(3, '0');
          }
          return str;
        } else str = input;
        if (str && typeof str === 'string') {
          const m = TIME_PATTERN.exec(str);
          if (m) {
            if (
              parseInt(m[1]) <= 23 &&
              parseInt(m[2]) <= 59 &&
              (!m[3] || parseInt(m[3]) <= 59)
            ) {
              if (!coerce) return str;
              let out = m[1];
              if (m[2]) out += ':' + m[2];
              if (m[3]) out += ':' + m[3];
              if (m[4]) out += '.' + m[4];
              return out;
            }
          }
        }
      }
      context.fail(_this, `Value must be a valid Time`, input);
    },
    options,
  );
}
