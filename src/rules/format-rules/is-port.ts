import validatorJS from '@browsery/validator';
import { type Nullish } from 'ts-gems';
import {
  type Context,
  type ValidationOptions,
  validator,
} from '../../core/index.js';

/**
 * Validates that a value is a valid TCP/UDP port number, and coerces it to a
 * `number`. Accepts a `string` or `number` input; numbers are stringified
 * before being checked with `validatorJS.isPort(input)`.
 *
 * @param options - Validation options.
 * @returns The port parsed as an integer `number` - not the original string.
 * @throws `Value must be a valid port number` when the input isn't a valid port.
 *
 * @example
 * ```ts
 * import { isPort } from 'valgen';
 *
 * isPort('80'); // => 80
 * isPort(80); // => 80
 * isPort('70000'); // throws ValidationError: "Value must be a valid port number"
 * ```
 * @validator isPort
 */
export function isPort(options?: isPort.Options) {
  return validator<number, string | number>(
    isPort.name,
    (input: unknown, context: Context, _this): Nullish<number> => {
      if (typeof input === 'number') input = String(input);
      if (
        input != null &&
        typeof input === 'string' &&
        validatorJS.isPort(input)
      ) {
        return parseInt(input, 10);
      }
      context.fail(_this, `Value must be a valid port number`, input);
    },
    options,
  );
}

export namespace isPort {
  export interface Options extends ValidationOptions {}
}
