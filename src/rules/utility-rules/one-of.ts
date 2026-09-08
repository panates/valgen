import type {
  Context,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

type DiscriminatorRecord = Record<string, Validator>;

/**
 * Tries each rule against the input in order and returns the first one that
 * passes. An optional discriminator record narrows which rule to try based
 * on a distinguishing field of the input.
 * @validator oneOf
 */
export function oneOf(
  rules: (Validator | [Validator, DiscriminatorRecord])[],
  options?: oneOf.Options,
) {
  const l = rules.length;
  return validator(
    oneOf.name,
    (input: any, context: Context, _this): any => {
      let i: number;
      let c: Validator;
      let discriminator: DiscriminatorRecord | undefined;
      let v: any;
      let passed = false;
      // Mock fail method to prevent errors
      context.fail = () => (passed = false);
      for (i = 0; i < l; i++) {
        passed = true;
        if (Array.isArray(rules[i])) {
          c = rules[i][0];
          discriminator = rules[i][1];
          if (!(
            input &&
            typeof input === 'object' &&
            typeof discriminator === 'object'
          )) {
            continue;
          }
          try {
            const keys = Object.keys(discriminator);
            const len = keys.length;
            let j: number;
            let k: string;
            for (j = 0; j < len; j++) {
              k = keys[j];
              discriminator[k](input[k], undefined, context);
              if (!passed) break;
            }
            if (!passed) continue;
          } catch {
            continue;
          }
        } else c = rules[i] as Validator;
        if (passed)
          try {
            v = c(input, undefined, context);
            if (passed) break;
          } catch {
            //
          }
      }
      // Restore fail method
      delete (context as any).fail;
      if (passed) return v;
      context.fail(_this, `Value didn't match one of required rules`, input);
    },
    options,
  );
}

export namespace oneOf {
  export interface Options extends ValidationOptions {}
}
