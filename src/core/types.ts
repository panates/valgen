import type { Context } from './context.js';

/**
 * Describes a single validation failure recorded during a validator run.
 *
 * One `ErrorIssue` is created per failed check - a single {@link ValidationError}
 * can carry more than one, e.g. when `isObject` validates several properties.
 */
export interface ErrorIssue {
  /** The (already template-resolved) human-readable failure message. */
  message: string;
  /** The id of the validator that reported this issue, e.g. `"isEmail"`. */
  rule: string;
  /** The offending value that failed validation. */
  value: any;
  /** An identifying name for the root value being validated (e.g. a schema's class name), inherited from the root {@link Context}. */
  root?: string;
  /** A dotted/bracketed path to the failing value, e.g. `"user.email"` or `"items[0]"`. */
  location?: string;
  /** A human-readable name for the object/schema the failing property belongs to. */
  context?: string;
  /** The name of the failing property, when the issue originates from an object schema. */
  property?: string;
  /** The index of the failing item, when the issue originates from an array/tuple. */
  index?: number;
  /** A human-readable label for the failing value, used to resolve `{{label}}` in message templates. */
  label?: string;

  [key: string]: any;
}

/**
 * Intercepts a validation failure before it is recorded.
 *
 * Return a `string` to replace the issue's message, a partial {@link ErrorIssue}
 * to merge onto it, or a falsy value to discard the issue entirely (as if
 * validation had passed for this particular check).
 *
 * @param issue - The issue that is about to be recorded.
 * @param context - The {@link Context} the failure occurred in.
 * @returns A replacement message, a partial issue to merge in, or a falsy value to discard the issue.
 */
export type OnFailFunction = (
  issue: ErrorIssue,
  context: Context,
) => string | Omit<ErrorIssue, 'id' | 'input'>;

/**
 * Options accepted by the {@link validator} factory - as opposed to per-call
 * {@link ExecutionOptions}, these configure a rule's default behavior for
 * every call unless overridden.
 */
export interface ValidationOptions {
  /** Intercepts every failure this rule records. */
  onFail?: OnFailFunction;
  /** Enables coercion by default, for rules that support it. */
  coerce?: boolean;
}

/**
 * Options accepted on a per-call basis by every {@link Validator}, in
 * addition to whatever rule-specific options a given validator documents.
 */
export interface ExecutionOptions extends ValidationOptions {
  /** When `true`, and the rule supports it, coerces compatible input into the target type instead of rejecting it. */
  coerce?: boolean;
  /** Stops collecting further issues (and throws immediately) once this many have been recorded. Defaults to unlimited. */
  maxErrors?: number;
  /** A human-readable name for the value being validated, used to resolve `{{label}}` in message templates instead of the raw property name. */
  label?: string;

  [key: string]: any;
}
