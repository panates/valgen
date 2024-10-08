import type { Nullish } from 'ts-gems';
import type { Context } from './context.js';
import { isValidator, type Validator, validator } from './validator.js';

/**
 * Forwards codec process to a sub codec. Useful for circular checks
 * @validator forwardRef
 */
export function forwardRef<T, I>(fn: (context: Context) => Validator<T, I>) {
  return validator<T, I>(
    'forwardRef',
    (input: I, context: Context): Nullish<T> => {
      const nested = fn(context);
      return nested(input, context);
    },
  );
}

/**
 * if "check" codec passes returns "then", "else" otherwise
 * @validator iif
 */
export function iif<TOutput1, TOutput2, TDefault1, TDefault2>(
  check: Validator<any>,
  than_: TDefault1 | Validator<TOutput1, any>,
  else_?: TDefault2 | Validator<TOutput2, any>,
);
export function iif(check: Validator<any>, _then: any, _else?: any) {
  return validator<any, any>('iif', (input: unknown, context: Context): any => {
    let c = _else;
    try {
      if (check(input) !== undefined) c = _then;
    } catch {
      // ignored
    }
    if (isValidator(c)) return c(input, context);
    return c;
  });
}
