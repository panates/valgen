import type {
  Context,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

type DiscriminatorRecord = Record<string, Validator>;

/**
 * Tries a list of rules against the input in order and returns the result of
 * the first one that passes.
 *
 * Each entry is either a plain {@link Validator}, or a
 * `[Validator, discriminatorRecord]` tuple. For a plain entry, `oneOf` calls
 * it directly; if it throws or fails, it moves on to the next entry
 * (short-circuits on the first *success*, not the first failure). For a
 * `[validator, discriminator]` tuple, `input` must be an object: `oneOf`
 * first runs each rule in `discriminator` against the matching property of
 * `input` (e.g. `discriminator.kind(input.kind)`); only if every
 * discriminator key passes does it go on to run the tuple's main `validator`
 * against the whole `input`. If any discriminator key fails (or `input`
 * isn't an object), that entry is skipped entirely - the main validator
 * never runs - and `oneOf` moves to the next candidate. This lets you
 * dispatch between differently-shaped objects using a cheap "tag" check
 * (e.g. a `kind` field) instead of trying and catching a full shape
 * validation for each candidate. An unexpected exception thrown by a
 * discriminator or a rule (as opposed to a normal validation failure) is
 * caught and treated the same as a failure.
 *
 * @param rules - The candidates to try, in order: either a plain validator,
 *   or a `[validator, discriminator]` tuple.
 * @param options - Shared validation options (`coerce`, `onFail`); `oneOf`
 *   has no options of its own.
 * @returns A validator that returns the first candidate's result to pass.
 * @throws {@link ValidationError} reporting the *last* candidate's own
 *   failure message directly (a normal validation message, or an unexpected
 *   exception's message) when no entry passes - since it can only report a
 *   single message anyway, the actual reason is more useful than a vague
 *   "didn't match". The generic `Value didn't match one of required rules`
 *   message is only used as a fallback when nothing was actually tried (e.g.
 *   an empty `rules` array).
 *
 * @example
 * ```ts
 * import { isNull, isNumber, isObject, isString, vg } from 'valgen';
 *
 * // simple form: first rule that passes wins
 * const simple = vg.oneOf([isNull, isNumber]);
 * simple(6); // => 6
 * simple('x'); // throws: "Value must be a number" (the last candidate's own error, reported directly)
 *
 * // discriminated form: pick the object shape based on `kind`
 * const pet = vg.oneOf([
 *   isString,
 *   [isObject, { kind: vg.isEqual('dog') }],
 *   [isObject, { kind: vg.isEqual('cat') }],
 *   vg.isEqual(5),
 * ]);
 * pet({ kind: 'cat', name: 'Molly' }); // => { kind: 'cat', name: 'Molly' }
 * ```
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
      // records the last failure's message, and it's reported directly as
      // the final error (oneOf can only report one message anyway) instead
      // of being discarded in favor of a generic one.
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
        lastFailMessage || `Value didn't match one of required rules`,
        input,
      );
    },
    options,
  );
}

export namespace oneOf {
  /** Options accepted by {@link oneOf}. Only the shared {@link ValidationOptions} - no `oneOf`-specific fields. */
  export interface Options extends ValidationOptions {}
}
