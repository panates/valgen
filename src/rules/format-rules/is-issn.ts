import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

export interface IsISSNOptions extends ValidationOptions {
  /**
   * If set to `true`, ISSNs with a lowercase `x` as the check digit are rejected.
   *
   * @default false
   */
  caseSensitive?: boolean;
}

/**
 * Validates if value is an ISSN
 * @validator isISSN
 */
export function isISSN(options?: IsISSNOptions) {
  const opts: validatorJS.IsISSNOptions = {
    case_sensitive: options?.caseSensitive,
  };
  return validator<string, string>(
    'isISSN',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isISSN(input, opts)) {
        return input;
      }
      context.fail(_this, `Value must be a valid ISSN`, input);
    },
    options,
  );
}
