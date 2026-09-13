import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

const TIME_PATTERN = /^(\d{2}):?(\d{2})(?::?(\d{2}))?(?:\.(\d{1,3}))?$/;

/**
 * Validates (and optionally coerces) a time-of-day value in `HH:mm`,
 * `HH:mm:ss`, or `HH:mm:ss.SSS` format, with or without separators. Not a
 * wrapper around `@browsery/validator` - it uses its own regex and checks
 * hour ≤ 23, minutes/seconds ≤ 59.
 *
 * @param options - Validation options. When `coerce` is `true`, a `Date`
 *   input is converted to a `HH:mm:ss[.SSS]` string, and a compact form
 *   without separators (e.g. `'1230'`) is normalized to colon-separated form;
 *   without `coerce`, the input string is returned unchanged.
 * @returns The validated (and possibly coerced) time string.
 * @throws `Value must be a valid Time` when the input isn't a recognized
 *   time-of-day value.
 *
 * @example
 * ```ts
 * import { isTime } from 'valgen';
 *
 * isTime('12:30', { coerce: true }); // => '12:30'
 * isTime('1230', { coerce: true }); // => '12:30'
 * isTime(new Date('2025-01-10T08:30:15'), { coerce: true }); // => '08:30:15'
 * isTime('25:00'); // throws ValidationError: "Value must be a valid Time"
 * ```
 * @validator isTime
 */
export function isTime(options?: isTime.Options) {
  return validator<string, string | Date>(
    isTime.name,
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

export namespace isTime {
  export interface Options extends ValidationOptions {}
}
