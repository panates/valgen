import { omitUndefined } from '../helpers/omit-undefined.js';
import type { ErrorIssue, ExecutionOptions, OnFailFunction } from './types.js';
import { ValidationError } from './validation-error.js';
import type { Validator } from './validator.js';

const VARIABLE_REPLACE_PATTERN = /{{([^}]*)}}/g;
const OPTIONAL_VAR_PATTERN = /^([^|]+)(?:\|(.*))?$/;

export class Context implements ExecutionOptions {
  isRoot = true;
  errors: ErrorIssue[] = [];
  maxErrors?: number;
  onFail?: OnFailFunction;
  coerce?: boolean;
  root?: string;
  location?: string;
  scope?: object;
  context?: string;
  property?: string;
  index?: number;
  label?: string;

  [key: string]: any;

  constructor(options?: ExecutionOptions) {
    Object.assign(this, options);
  }

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
