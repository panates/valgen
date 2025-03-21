import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

export interface IsFQDNOptions extends ValidationOptions {
  /**
   * If set to true, the validator will allow domain starting with `*.` (e.g. `*.example.com` or `*.shop.example.com`).
   * @default false
   */
  allowWildcard?: boolean;
}

/**
 * Validates if value is an FQDN
 * @validator isFQDN
 */
export function isFQDN(options?: IsFQDNOptions) {
  const opts: validatorJS.IsFQDNOptions = {
    allow_wildcard: options?.allowWildcard,
  };
  return validator<string, string>(
    'isFQDN',
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isFQDN(input, opts)) {
        return input;
      }
      context.fail(_this, `Value must be valid FQDN`, input);
    },
    options,
  );
}
