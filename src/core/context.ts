import { omitUndefined } from '../helpers/omit-undefined.js';
import type { ErrorIssue, ExecutionOptions, OnFailFunction } from './types.js';
import { ValidationError } from './validation-error.js';
import type { Validator } from './validator.js';

const VARIABLE_REPLACE_PATTERN = /{{([^}]*)}}/g;
/** The fields of `Context` that `extend()` copies one by one. */
const CONTEXT_FIELDS = new Set([
  'isRoot',
  'errors',
  'maxErrors',
  'onFail',
  'coerce',
  'root',
  'location',
  'scope',
  'context',
  'property',
  'index',
  'label',
  'circMap',
  'customKeys',
]);
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
  /** Objects already being converted in this run, kept by `isObject` when `detectCircular` is on. */
  circMap?: Map<object, object>;
  /**
   * Names of the options that are not fields of `Context` (custom options
   * passed in `ExecutionOptions`), so {@link Context.extend} can copy them
   * to the child too.
   * @internal
   */
  customKeys?: string[];

  [key: string]: any;

  /**
   * @param options - Initial execution options, assigned directly onto the new context.
   * @param parent - Used by {@link Context.extend} only: copies `parent`'s
   *   fields instead of starting a new run. @internal
   */
  constructor(options?: ExecutionOptions, parent?: Context) {
    if (parent) copyFields(this, parent);
    else if (options) assignOptions(this, options, false);
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
   * Creates a child context for a nested validator call: a copy of this
   * context's fields (sharing the same `errors` array), with `options`
   * applied on top where given.
   *
   * The child is a snapshot: a field changed on this context after the child
   * was made does not reach the child. Custom options (keys outside the
   * `Context` fields) are carried over when they were passed as options to
   * the root call or to `extend()`.
   *
   * Nested rules (an object schema's properties, an array's items, a pipe's
   * steps, ...) should reuse the *same* extended context across every call
   * within one loop rather than calling `extend()` per call, and should
   * prefer the 3-argument form `nestedRule(input, undefined, context)` so
   * the validator wrapper doesn't extend the context a second time.
   *
   * @param options - Fields to override on the child context; `undefined`
   *   values are skipped so the parent's value is kept.
   * @returns A new `Context` with `isRoot: false`.
   */
  extend(options?: ExecutionOptions): Context {
    // A copy rather than Object.create(this): making a context the
    // prototype of its child, then writing location/property to it for
    // every property and item, is slow in V8 (stores to prototype objects
    // invalidate its caches), and lookups walked the whole chain.
    let extended: Context;
    if (this.constructor === Context) {
      extended = new Context(undefined, this);
    } else {
      // A subclass may not pass `parent` on to this constructor; copy its
      // own fields onto an object with the same prototype instead.
      extended = Object.assign(
        Object.create(Object.getPrototypeOf(this)),
        this,
      );
      extended.isRoot = false;
    }
    if (options) assignOptions(extended, options, true);
    return extended;
  }
}

/**
 * Copies `options` onto `context`, recording the names of custom
 * (non-`Context`) options in `customKeys` so `extend()` carries them over.
 */
function assignOptions(
  context: Context,
  options: ExecutionOptions,
  skipUndefined: boolean,
): void {
  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const v = (options as Record<string, unknown>)[k];
    if (skipUndefined && v === undefined) continue;
    context[k] = v;
    if (!CONTEXT_FIELDS.has(k)) {
      const customKeys = context.customKeys;
      if (!customKeys) context.customKeys = [k];
      else if (!customKeys.includes(k)) {
        // Copied, not pushed: the parent shares the same array.
        context.customKeys = [...customKeys, k];
      }
    }
  }
}

/**
 * Fills a new child context with a copy of `parent`'s fields. Every field is
 * set in the same order on every context, so all contexts share one hidden
 * class and property reads stay fast. Kept out of the constructor so that it
 * stays small for the root context made on every top-level call.
 */
function copyFields(c: Context, parent: Context): void {
  c.isRoot = false;
  c.errors = parent.errors;
  c.maxErrors = parent.maxErrors;
  c.onFail = parent.onFail;
  c.coerce = parent.coerce;
  c.root = parent.root;
  c.location = parent.location;
  c.scope = parent.scope;
  c.context = parent.context;
  c.property = parent.property;
  c.index = parent.index;
  c.label = parent.label;
  c.circMap = parent.circMap;
  const customKeys = parent.customKeys;
  c.customKeys = customKeys;
  if (customKeys) {
    for (let i = 0; i < customKeys.length; i++) {
      c[customKeys[i]] = parent[customKeys[i]];
    }
  }
  // A rule may replace `fail` on a context for the duration of a call
  // (oneOf does); contexts made from it inside that call must use it too.
  if (parent.fail !== Context.prototype.fail) c.fail = parent.fail;
}
