import type {
  Context,
  ErrorIssue,
  Nullish,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

/**
 * Validates the record object according to given "key" and "value" rules
 * Converts properties according to rules if the coerce option is set to 'true'.
 * @validator isRecord
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
