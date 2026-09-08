import type {
  Context,
  ErrorIssue,
  Nullish,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

/**
 * Validates if the value is "array" and applies validation for each item.
 * Converts input value to array if the coerce option is set to 'true'.
 * @validator isArray
 */
export function isArray<T, I>(
  itemValidator?: Validator<T, I>,
  options?: isArray.Options,
) {
  return validator<T[], I[] | I>(
    isArray.name,
    (input: unknown, context: Context, _this): Nullish<T[]> => {
      const coerce = options?.coerce ?? context.coerce;
      let output: any = input;
      if (output != null && coerce && !Array.isArray(output)) output = [output];
      if (!Array.isArray(output)) {
        context.fail(_this, `Value must be an array`, input);
        return;
      }
      if (!itemValidator) return output as T[];
      const itemContext = context.extend();
      let i: number;
      let v: any;
      const l = output.length;
      const out: any[] = [];
      // Set directly on the (already reused) context instead of passed as
      // a fresh {onFail} options object on every call - `i` is read at call
      // time (synchronously, before it's incremented), so a single closure
      // works for the whole loop. This also lets the item call below pass
      // `undefined` for options, which the validator wrapper needs in order
      // to skip a needless context.extend() when the item rule has no
      // options of its own.
      itemContext.onFail = (issue: ErrorIssue) =>
        `Item at index [${i}] is not valid. ` + issue.message;
      for (i = 0; i < l; i++) {
        v = output[i];
        itemContext.scope = output;
        itemContext.location = context.location
          ? context.location + `[${i}]`
          : `<Array>[${i}]`;
        itemContext.index = i;
        v = itemValidator(v, undefined, itemContext) as T;
        out.push(v);
      }
      return out;
    },
    options,
  );
}

export namespace isArray {
  export interface Options extends ValidationOptions {}
}
