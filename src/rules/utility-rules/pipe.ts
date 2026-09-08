import {
  type Context,
  type Nullish,
  type ValidationOptions,
  type Validator,
  validator,
} from '../../core/index.js';

/**
 * Chains rules so each one's output becomes the next one's input.
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
  export interface Options extends ValidationOptions {
    returnIndex?: number;
  }
}
