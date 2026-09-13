import { omitUndefined } from '../helpers/omit-undefined.js';
import type { ErrorIssue, ExecutionOptions, OnFailFunction } from './types.js';
import { ValidationError } from './validation-error.js';
import type { Validator } from './validator.js';

const VARIABLE_REPLACE_PATTERN = /{{([^}]*)}}/g;
const OPTIONAL_VAR_PATTERN = /^([^|]+)(?:\|(.*))?$/;

/**
 * Carries execution options and accumulated failures through a single
 * validation run, including across nested validator calls.
 *
 * A root `Context` is created once for a top-level `validator(...)` call;
 * nested rules (properties of an `isObject` schema, items of an `isArray`,
 * steps of a `pipe`, ...) share it via {@link Context.extend}, so failures
 * from anywhere in the run accumulate into the same `errors` array and are
 * thrown together as a single {@link ValidationError}.
 */
export class Context implements ExecutionOptions {
  /** `true` for the context created at the top-level call; `false` for every context produced by {@link Context.extend}. */
  isRoot = true;
  /** Issues recorded so far during this validation run (shared across nested contexts). */
  errors: ErrorIssue[] = [];
  /** Stops collecting further issues (and throws immediately) once this many have been recorded. */
  maxErrors?: number;
  /** Intercepts every failure recorded through this context. */
  onFail?: OnFailFunction;
  /** Enables coercion for rules that support it. */
  coerce?: boolean;
  /** An identifying name for the root value being validated (e.g. a schema's class name), set once and inherited by every nested context. */
  root?: string;
  /** A dotted/bracketed path to the value currently being validated, e.g. `"user.address"` or `"items[0]"`. */
  location?: string;
  /** The object a nested property/item belongs to - used by rules like `exists` to look up property descriptors. */
  scope?: object;
  /** A human-readable name for the object/schema the current value belongs to. */
  context?: string;
  /** The name of the property currently being validated, when nested inside an object schema. */
  property?: string;
  /** The index of the item currently being validated, when nested inside an array/tuple. */
  index?: number;
  /** A human-readable label for the current value, used to resolve `{{label}}` in message templates. */
  label?: string;

  [key: string]: any;

  /**
   * @param options - Initial execution options, assigned directly onto the new context.
   */
  constructor(options?: ExecutionOptions) {
    Object.assign(this, options);
  }

  /**
   * Records a validation failure as an {@link ErrorIssue}.
   *
   * Resolves `{{key}}` / `{{key|fallback}}` placeholders in `message` against
   * the issue's own fields (falling back to this context's `location`/
   * `property` for `{{label}}`), runs the context's `onFail` interceptor if
   * set, then appends the result to `errors`. Throws immediately once
   * `errors.length` reaches `maxErrors`; otherwise the root call throws a
   * single {@link ValidationError} once the whole run completes.
   *
   * @param rule - The validator reporting the failure; its `id` is recorded on the issue.
   * @param message - The failure message, or an `Error` whose `.message` is
   *   used instead. May contain `{{key}}`/`{{key|fallback}}` placeholders.
   * @param value - The offending value.
   * @param details - Additional fields to merge onto the recorded issue.
   */
  fail(
    rule: Validator,
    message: string | Error,
    value: any,
    details?: Record<string, any>,
  ): void {
    const issue = omitUndefined<ErrorIssue>({
      message: message instanceof Error ? message.message : String(message),
      rule: rule.id,
      root: this.root,
      location: this.location,
      context: this.context,
      property: this.property,
      index: this.index,
      label: this.label,
      value,
      ...details,
    });
    issue.value = value;

    if (this.onFail) {
      const x = this.onFail(issue, this);
      if (!x) return;
      if (typeof x === 'object') Object.assign(issue, x);
      else issue.message = String(x);
    }
    issue.message = ('' + issue.message).replace(
      VARIABLE_REPLACE_PATTERN,
      (x, g: string) => {
        const m = OPTIONAL_VAR_PATTERN.exec(g);
        if (!m) return x;
        const k = m[1];
        let v = issue[k];
        if (k === 'value') {
          const s = String(issue.value);
          return s.length < 30 ? s : s.substring(0, 30) + '..';
        }
        if (!v && k === 'label' && (this.location || this.property)) {
          v = '`' + (this.location || this.property) + '`';
        }
        if (v != null) return v;
        if (m[2]) return m[2];
        return m[1] === 'label' ? 'Value' : x;
      },
    );

    this.errors.push(issue);
    if (this.errors.length >= (this.maxErrors ?? Infinity)) {
      throw new ValidationError(this.errors);
    }
  }

  /**
   * Creates a child context for a nested validator call, inheriting every
   * field from this context via the prototype chain and overriding it with
   * `options` where given.
   *
   * Nested rules (an object schema's properties, an array's items, a pipe's
   * steps, ...) should reuse the *same* extended context across every call
   * within one loop rather than calling `extend()` per call, and should
   * prefer the 3-argument form `nestedRule(input, undefined, context)` so
   * the validator wrapper doesn't extend the context a second time.
   *
   * @param options - Fields to override on the child context; `undefined`
   *   values are skipped so they fall through to the parent instead of
   *   shadowing it.
   * @returns A new `Context` with `isRoot: false`, prototypically inheriting from this one.
   */
  extend(options?: ExecutionOptions): Context {
    // Object.create(this) sets the prototype at creation time. Setting it
    // afterward via Object.setPrototypeOf() (the previous approach) is one
    // of the slowest object operations in V8 - it invalidates hidden-class
    // based optimizations for the object - and this runs on every nested
    // validator call, so it showed up heavily in profiling.
    const extended: Context = Object.create(this);
    if (options) {
      // Same filtering as the old Object.entries()+destructure (skip
      // undefined values, so an unset option falls through to the
      // prototype chain instead of shadowing it) but without allocating an
      // array of [key, value] pairs just to throw it away.
      const keys = Object.keys(options);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = (options as Record<string, unknown>)[k];
        if (v !== undefined) extended[k] = v;
      }
    }
    extended.isRoot = false;
    return extended;
  }
}
