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
      // Every candidate failing is normal control flow here (that's how
      // "try the next one" works), so a candidate's own context.fail must
      // not throw or accumulate into the real error list. But swallowing it
      // completely would hide the *reason* every candidate failed - including
      // a genuine bug in a candidate rule, which would otherwise look
      // identical to "the input just didn't match". So the mock still
      // records the last failure's message; if nothing ends up passing, it's
      // surfaced alongside the generic message instead of being discarded.
      let lastFailMessage: string | undefined;
      context.fail = (_rule: Validator, message: string | Error) => {
        passed = false;
        lastFailMessage =
          message instanceof Error ? message.message : String(message);
      };
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
          } catch (e: any) {
            // A discriminator/rule that throws directly (bypassing
            // context.fail entirely, e.g. a plain function rather than one
            // built with validator()) must still count as "this candidate
            // failed" - otherwise `passed` is left at its top-of-loop `true`
            // and, if this is the last candidate, oneOf would silently
            // return an unvalidated value instead of failing.
            passed = false;
            lastFailMessage =
              e?.message != null ? String(e.message) : String(e);
            continue;
          }
        } else c = rules[i] as Validator;
        if (passed)
          try {
            v = c(input, undefined, context);
            if (passed) break;
          } catch (e: any) {
            passed = false;
            lastFailMessage =
              e?.message != null ? String(e.message) : String(e);
          }
      }
      // Restore fail method
      delete (context as any).fail;
      if (passed) return v;
      context.fail(
        _this,
        lastFailMessage
          ? `Value didn't match one of required rules (last error: ${lastFailMessage})`
          : `Value didn't match one of required rules`,
        input,
        { lastError: lastFailMessage },
      );
    },
    options,
  );
}

export namespace oneOf {
  export interface Options extends ValidationOptions {}
}
