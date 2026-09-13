import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Chains a list of validators so that each one's output becomes the next
 * one's input: `rules[0]`'s output becomes `rules[1]`'s input, and so on.
 *
 * Short-circuits on the first rule that records a failure: as soon as a step
 * adds to the shared context's error list, `pipe` stops immediately and does
 * not run the remaining rules. If every rule succeeds, returns the last
 * rule's output - or, if `options.returnIndex` is given, the output of that
 * specific step (even though later steps still ran for validation purposes).
 *
 * @typeParam T - The output type on success.
 * @param rules - The validators to chain, in order.
 * @param options - Validation options, including {@link pipe.Options.returnIndex}.
 * @returns A validator that feeds the input through each rule in sequence
 *   and returns the final (or `returnIndex`-selected) step's output.
 * @throws {@link ValidationError} from whichever rule first records a failure.
 *
 * @example
 * ```ts
 * import { isBoolean, isNumber, isString, vg } from 'valgen';
 *
 * vg.pipe([isString, vg.matches(/^[a-z]+$/)])('abc'); // => 'abc'
 *
 * // each step's output feeds the next: string -> number -> boolean
 * vg.pipe([isString, isNumber, isBoolean])(1, { coerce: true }); // => true
 *
 * // returnIndex pins the result to an earlier step, while later steps still validate
 * vg.pipe([isString, isNumber, vg.isGte(5)], { returnIndex: 1 })('123', {
 *   coerce: true,
 * }); // => 123
 * ```
 * @validator pipe
 */
export function pipe<T>(
  rules: Validator[],
  options?: pipe.Options,
): Validator<T> {
  const l = rules.length;
  const returnIndex = options?.returnIndex;
  return validator<T, any>(
    pipe.name,
    (input: unknown, context: Context): Nullish<T> => {
      let i: number;
      let c: Validator;
      let v = input;
      let returnValue: any = input;
      const oldErrors = context.errors.length;
      for (i = 0; i < l; i++) {
        c = rules[i];
        // Pass context in its own (3rd) slot, not the 2nd (options) slot.
        // The validator wrapper only extends the context when there's an
        // actual options object to merge in - passing context as "options"
        // instead makes it match `instanceof Context` and forces an
        // unconditional (and needless, most of the time) extend() on every
        // step.
        v = c(v, undefined, context);
        if (returnIndex == null || i <= returnIndex) returnValue = v;
        if (context.errors.length > oldErrors) return;
      }
      return returnValue as T;
    },
    options,
  );
}

export namespace pipe {
  /** Options accepted by {@link pipe}. */
  export interface Options extends ValidationOptions {
    /**
     * Return the intermediate output produced after `rules[returnIndex]`
     * instead of the final step's output. All steps still run (and their
     * results still feed forward into subsequent steps) - this only changes
     * which intermediate value is handed back to the caller.
     * @defaultValue undefined (the last step's output is returned)
     */
    returnIndex?: number;
  }
}
