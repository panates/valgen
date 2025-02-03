import { type ErrorIssue } from './types.js';

export class ValidationError extends Error {
  issues: ErrorIssue[] = [];

  constructor(issues: ErrorIssue[]) {
    super(
      issues[0].message +
        (issues[0].location ? `\n  at ${issues[0].location}` : ''),
    );
    this.issues = issues;
  }
}
