import validatorJS from '@browsery/validator';
import type { Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a string is structurally a valid JWT (JSON Web Token).
 * Delegates to `validatorJS.isJWT(input)`, which checks for three base64url
 * segments separated by `.` (it does not verify a signature).
 * @validator isJWT
 * @param options - Validation options.
 * @returns The validated JWT string, unchanged.
 * @throws `Value must be valid JWT token` when the input is not a string, or
 *   does not have the three-segment base64url structure of a JWT.
 * @example
 * ```ts
 * import { isJWT } from 'valgen';
 *
 * const jwt =
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
 * isJWT(jwt); // => jwt
 * isJWT('abc.def'); // throws ValidationError: "Value must be valid JWT token"
 * ```
 */
export function isJWT(options?: isJWT.Options) {
  return validator<string, string>(
    isJWT.name,
    (input: unknown, context: Context, _this): Nullish<string> => {
      if (typeof input === 'string' && validatorJS.isJWT(input)) return input;
      context.fail(_this, `Value must be valid JWT token`, input);
    },
    options,
  );
}

export namespace isJWT {
  export interface Options extends ValidationOptions {}
}
