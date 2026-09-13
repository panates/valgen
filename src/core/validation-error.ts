import { type ErrorIssue } from './types.js';

/**
 * Thrown by a {@link Validator} when validation fails at the root call (as
 * opposed to `.silent()`, which returns a `{ errors }` result instead).
 *
 * Carries every {@link ErrorIssue} recorded during the run, not just the
 * first one - inspect `issues` for the full list of failures, e.g. every
 * failing property of an `isObject` schema.
 */
export class ValidationError extends Error {
  /** Every issue recorded during this validation run, in the order they occurred. */
  issues: ErrorIssue[] = [];

  /**
   * @param issues - The recorded issues. The error's own `message` (and
   *   optional `\n  at <location>` suffix) is derived from `issues[0]`.
   */
  constructor(issues: ErrorIssue[]) {
    super(
      issues[0].message +
        (issues[0].location ? `\n  at ${issues[0].location}` : ''),
    );
    this.issues = issues;
  }
}
