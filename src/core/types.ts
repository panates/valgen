import type { Context } from './context.js';

export interface ErrorIssue {
  message: string;
  rule: string;
  value: any;
  root?: string;
  location?: string;
  context?: string;
  property?: string;
  index?: number;
  label?: string;

  [key: string]: any;
}

export type OnFailFunction = (
  issue: ErrorIssue,
  context: Context,
) => string | Omit<ErrorIssue, 'id' | 'input'>;

export interface ValidationOptions {
  onFail?: OnFailFunction;
  coerce?: boolean;
}

export interface ExecutionOptions extends ValidationOptions {
  coerce?: boolean;
  maxErrors?: number;
  label?: string;

  [key: string]: any;
}
