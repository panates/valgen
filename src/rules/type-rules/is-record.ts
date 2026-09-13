import type {
  Context,
  ErrorIssue,
  Nullish,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

/**
 * Validates a plain object as a "dictionary": every key must satisfy
 * `keyRule` and every value must satisfy `valueRule`. With `coerce: true`,
 * both keys and values may be coerced by their respective rules.
 * @validator isRecord
 * @param keyRule - Rule every own key of the input is validated against.
 * @param valueRule - Rule every value of the input is validated against.
 * @param options - Validation options.
 * @returns An object with the validated (and possibly coerced) keys and values.
 * @throws `Value must be an object` if the input is `null`, `undefined`, or
 *   not an object.
 * @throws `<key> is not a valid key. <underlying message>` if a key fails
 *   `keyRule`.
 * @example
 * ```ts
 * import { isAny, isString, vg } from 'valgen';
 *
 * const validate = vg.isRecord(isString, isAny);
 * validate(null as any); // throws ValidationError: 'Value must be an object'
 *
 * vg.isRecord(isString, isString)({ a: 1 as any, b: true as any }, { coerce: true });
 * // => { a: '1', b: 'true' }
 * ```
 */
export function isRecord<TKeys extends string | number | symbol, TValues>(
  keyRule: Validator<TKeys>,
  valueRule: Validator<TValues>,
  options?: isRecord.Options,
) {
  return validator<Record<TKeys, TValues>>(
    isRecord.name,
    (
      input: object | undefined,
      context: Context,
      _this,
    ): Nullish<Record<TKeys, TValues>> => {
      if (!(input && typeof input === 'object')) {
        context.fail(_this, `Value must be an object`, input);
        return;
      }
      const keyContext = context.extend();
      const valueContext = context.extend();
      const location = context.location || '';
      const keys = Object.keys(input);
      const l = keys.length;
      let i: number;
      let k: any;
      let v: any;
      const out: any = {};
      // Set directly on the (already reused) context instead of passed as
      // a fresh {onFail} options object on every call - `k` is read at call
      // time (synchronously, before it's reassigned below), so a single
      // closure works for the whole loop. This also lets both calls below
      // pass `undefined` for options, which the validator wrapper needs in
      // order to skip a needless context.extend() when the key/value rule
      // has no options of its own.
      keyContext.onFail = (issue: ErrorIssue) =>
        `${k} is not a valid key. ` + issue.message;
      for (i = 0; i < l; i++) {
        k = keys[i];
        v = input[k];
        // Validate key
        k = keyRule(k, undefined, keyContext);
        // Validate value
        valueContext.property = k;
        valueContext.location = location + (location ? '.' : '') + k;
        v = valueRule(v, undefined, valueContext);
        out[k] = v;
      }
      return context.errors.length ? undefined : out;
    },
    options,
  );
}

export namespace isRecord {
  export interface Options extends ValidationOptions {}
}
