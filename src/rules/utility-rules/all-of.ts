import type {
  Context,
  ValidationOptions,
  Validator,
} from '../../core/index.js';
import { validator } from '../../core/index.js';

/**
 * Runs every rule in `rules` against the same, unchanged input and requires
 * all of them to pass. Unlike {@link pipe}, one rule's output never feeds
 * into the next - every rule sees the original input.
 *
 * Does not short-circuit: every rule is evaluated even after an earlier one
 * has already failed, so a failing input can surface issues from multiple
 * rules at once. The accumulated failures are thrown together as a single
 * `ValidationError` when the outermost call completes.
 *
 * @typeParam T - The output type on success (the unchanged input's type).
 * @param rules - The validators to run, each against the same input.
 * @param options - Shared validation options (`coerce`, `onFail`); `allOf`
 *   has no options of its own.
 * @returns A validator that returns the original input unchanged if every
 *   rule in `rules` passes.
 * @throws {@link ValidationError} if one or more rules fail - reporting each
 *   failing rule's own message.
 *
 * @example
 * ```ts
 * import { isNumber, vg } from 'valgen';
 *
 * // must be a number AND greater than 5 AND less than 10
 * const codec = vg.allOf([isNumber, vg.isGt(5), vg.isLt(10)]);
 * codec(6); // => 6
 * codec('x'); // throws: "Value must be a number"
 * ```
 * @validator allOf
 */
export function allOf<T = any>(
  rules: Validator[],
  options?: allOf.Options,
): Validator<T> {
  return validator(
    allOf.name,
    (input: any, context: Context): any => {
      let i: number;
      let c: Validator;
      const l = rules.length;
      for (i = 0; i < l; i++) {
        c = rules[i];
        // See pipe.ts for why context goes in the 3rd slot, not the 2nd.
        c(input, undefined, context);
      }
      return input;
    },
    options,
  );
}

export namespace allOf {
  /** Options accepted by {@link allOf}. Only the shared {@link ValidationOptions} - no `allOf`-specific fields. */
  export interface Options extends ValidationOptions {}
}
